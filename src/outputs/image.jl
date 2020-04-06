
const RulesetOrSimData = Union{Rule,AbstractSimData}

"""
Graphic outputs that display the simulation grid(s) as RGB24 images.

Although the majority of the code is maintained here to enable sharing
and reuse, no `ImageOutput`s are provided in DynamicGrids.jl to avoid
heavey dependencies on graphics libraries. See
[DynamicGridsGtk.jl](https://github.com/cesaraustralia/DynamicGridsGtk.jl)
and [DynamicGridsInteract.jl](https://github.com/cesaraustralia/DynamicGridsInteract.jl)
for implementations.
"""
abstract type ImageOutput{T} <: GraphicOutput{T} end

"""
Construct one ImageOutput from another ImageOutput
"""
(::Type{F})(o::T; kwargs...) where F <: ImageOutput where T <: ImageOutput = F(;
    frames=frames(o),
    starttime=starttime(o),
    endtime=endtime(o),
    fps=fps(o),
    showfps=showfps(o),
    timestamp=timestamp(o),
    stampframe=stampframe(o),
    store=store(o),
    processor=processor(o),
    minval=minval(o),
    maxval=maxval(o),
    kwargs...
)

"""
Mixin fields for `ImageOutput`s
"""
@premix @default_kw struct Image{P,Mi,Ma}
    processor::P | ColorProcessor()
    minval::Mi   | 0
    maxval::Ma   | 1
end

processor(o::Output) = Greyscale()
processor(o::ImageOutput) = o.processor

minval(o::Output) = 0
minval(o::ImageOutput) = o.minval

maxval(o::Output) = 1
maxval(o::ImageOutput) = o.maxval


# Allow construcing a frame with the ruleset passed in instead of SimData
showgrid(o::ImageOutput, f, t) = showgrid(o[f], o, Ruleset(), f, t)
showgrid(grid, o::ImageOutput, data::RulesetOrSimData, f, t) =
    showimage(grid2image(o, data, grid, f), o, data, f, t)

"""
    showimage(image, output, f, t)

Show image generated by and `GridProcessor` in an ImageOutput.
"""
function showimage end

"""
Default colorscheme. Better performance than using a Colorschemes.jl
scheme as there is no interpolation.
"""
struct Greyscale{M1,M2}
    min::M1
    max::M2
end
Greyscale(; min=nothing, max=nothing) = Greyscale(min, max)

Base.get(scheme::Greyscale, x) = scale(x, scheme.min, scheme.max)

"Alternate name for Greyscale()"
const Grayscale = Greyscale


"""
Grid processors convert a frame of the simulation into an RGB24 image for display.
Frames may hold one or multiple grids.
"""
abstract type GridProcessor end

"""
    grid2image(o::ImageOutput, data::Union{Ruleset,SimData}, grid, t::Integer)
    grid2image(p::GridProcessor, minval, maxval, data::Union{Ruleset,SimData}, grids, t)

Convert a grid or named tuple of grids to an RGB24 image, using a GridProcessor

[`GridProcessor`](@reg) is intentionally not dispatched with the output type in
the methods that finally generate images, to reduce coupling.
But it they can be distpatched on together when required for custom outputs.
"""
function grid2image end

grid2image(o::ImageOutput, data::RulesetOrSimData, grid, t::Integer) =
    grid2image(processor(o), o, data, grid, t)
grid2image(processor::GridProcessor, o::ImageOutput, data::RulesetOrSimData, grid, t) =
    grid2image(processor::GridProcessor, minval(o), maxval(o), data, grid, t)

"""
Grid processors that convert one grid to an image.

The first grid will be displayed if a SingleGridProcessor is
used with a NamedTuple of grids.
"""
abstract type SingleGridProcessor <: GridProcessor end

grid2image(p::SingleGridProcessor, minval, maxval,
           data::RulesetOrSimData, grids::NamedTuple, t) =
    grid2image(p, minval, maxval, data, first(grids), t)
grid2image(p::SingleGridProcessor, minval, maxval,
           data::RulesetOrSimData, grid::AbstractArray, t) = begin
    img = fill(RGB24(0), size(grid))
    for I in CartesianIndices(grid)
        img[I] = cell2rgb(p, minval, maxval, data, grid[I], I)
    end
    img
end

"""
Processors that convert multiple grids to a single image.
"""
abstract type MultiGridProcessor <: GridProcessor end

""""
    ColorProcessor(; scheme=Greyscale(), zerocolor=nothing, maskcolor=nothing)

Converts output grids to a colorsheme.

## Arguments / Keyword Arguments
- `scheme`: a ColorSchemes.jl colorscheme.
- `zerocolor`: an `RGB24` color to use when values are zero, or `nothing` to ignore.
- `maskcolor`: an `RGB24` color to use when cells are masked, or `nothing` to ignore.
"""
@default_kw struct ColorProcessor{S,Z,M} <: SingleGridProcessor
    scheme::S    | Greyscale()
    zerocolor::Z | nothing
    maskcolor::M | nothing
end

scheme(processor::ColorProcessor) = processor.scheme
zerocolor(processor::ColorProcessor) = processor.zerocolor
maskcolor(processor::ColorProcessor) = processor.maskcolor

@inline cell2rgb(p::ColorProcessor, minval, maxval, data::RulesetOrSimData, val, I) =
    if !(maskcolor(p) isa Nothing) && ismasked(mask(data), I)
        maskcolor(p)
    else
        normval = normalise(val, minval, maxval)
        if !(zerocolor(p) isa Nothing) && normval == zero(normval)
            zerocolor(p)
        else
            rgb24(scheme(p), normval)
        end
    end

struct SparseOptInspector <: SingleGridProcessor end

@inline cell2rgb(p::SparseOptInspector, minval, maxval, data::AbstractSimData, val, I) = begin
    r = radius(first(grids(data)))
    blocksize = 2r
    blockindex = indtoblock.((I[1] + r,  I[2] + r), blocksize)
    normedval = normalise(val, minval, maxval)
    if sourcestatus(first(data))[blockindex...]
        if normedval > 0
            rgb24(normedval)
        else
            rgb24(0.0, 0.5, 0.5)
        end
    elseif normedval > 0
        rgb24(1.0, 0.0, 0.0)
    else
        rgb24(0.5, 0.5, 0.0)
    end
end


abstract type BandColor end

struct Red <: BandColor end
struct Green <: BandColor end
struct Blue <: BandColor end

"""
    ThreeColorProcessor(; colors=(Red(), Green(), Blue()), zerocolor=nothing, maskcolor=nothing)

Assigns `Red()`, `Blue()`, `Green()` or `nothing` to
any number of dynamic grids in any order. Duplicate colors will be summed.
The final color sums are combined into a composite color image for display.

## Arguments / Keyword Arguments
- `colors`: a tuple or `Red()`, `Green()`, `Blue()`, or `nothing` matching the number of grids.
- `zerocolor`: an `RGB24` color to use when values are zero, or `nothing` to ignore.
- `maskcolor`: an `RGB24` color to use when cells are masked, or `nothing` to ignore.
"""
@default_kw struct ThreeColorProcessor{C<:Tuple,Z,M} <: MultiGridProcessor
    colors::C    | (Red(), Green(), Blue())
    zerocolor::Z | nothing
    maskcolor::M | nothing
end

colors(processor::ThreeColorProcessor) = processor.colors
zerocolor(processor::ThreeColorProcessor) = processor.zerocolor
maskcolor(processor::ThreeColorProcessor) = processor.maskcolor

grid2image(p::ThreeColorProcessor, minval::Tuple, maxval::Tuple,
           data::RulesetOrSimData, grids::NamedTuple, t) = begin
    img = fill(RGB24(0), size(first(grids)))
    ncols, ngrids, nmin, nmax = map(length, (colors(p), grids, minval, maxval))
    if !(ngrids == ncols == nmin == nmax)
        ArgumentError(
            "Number of grids ($ngrids), processor colors ($ncols), " *
            "minval ($nmin) and maxival ($nmax) must be the same"
        ) |> throw
    end
    for i in CartesianIndices(first(grids))
        img[i] = if !(maskcolor(p) isa Nothing) && ismasked(mask(data), i)
            maskcolor(p)
        else
            xs = map((f, mi, ma) -> normalise(f[i], mi, ma), values(grids), minval, maxval)
            if !(zerocolor(p) isa Nothing) && all(map(x -> x .== zero(x), xs))
                zerocolor(p)
            else
                combinebands(colors(p), xs)
            end
        end
    end
    img
end

"""
LayoutProcessor(layout::Array, processors)
    LayoutProcessor(reshape(layout, length(layout), 1), processors)

LayoutProcessor allows displaying multiple grids in a block layout,
by specifying a layout matrix and a list of SingleGridProcessors to
be run for each.

## Arguments / Keyword arguments
- `layout`: A Vector or Matrix containing the keys or numbers of grids in the locations to
  display them. `nothing`, `missing` or `0` values will be skipped.
- `processors`: tuple of SingleGridProcessor, one for each grid in the simulation.
  Can be `nothing` or any other value for grids not in layout.
"""
@default_kw struct LayoutProcessor{L<:AbstractMatrix,P} <: MultiGridProcessor
    layout::L     | throw(ArgumentError("must include an Array for the layout keyword"))
    processors::P | throw(ArgumentError("include a tuple of processors for each grid"))
end
# Convenience constructor to convert Vector input to a column Matrix
LayoutProcessor(layout::AbstractVector, processors) =
    LayoutProcessor(reshape(layout, length(layout), 1), processors)

layout(p::LayoutProcessor) = p.layout
processors(p::LayoutProcessor) = p.processors

grid2image(p::LayoutProcessor, minval::Tuple, maxval::Tuple,
           data::RulesetOrSimData, grids::NamedTuple, t) = begin
    ngrids, nmin, nmax = map(length, (grids, minval, maxval))
    if !(ngrids == nmin == nmax)
        ArgumentError(
            "Number of grids ($ngrids), minval ($nmin) and maxval ($nmax) must be the same"
        ) |> throw
    end

    grid_ids = layout(p)
    sze = size(first(grids))
    img = fill(RGB24(0), sze .* size(grid_ids))
    # Loop over the layout matrix
    for i in 1:size(grid_ids, 1), j in 1:size(grid_ids, 2)
        grid_id = grid_ids[i, j]
        # Accept symbol keys and numbers, skip missing/nothing/0
        (ismissing(grid_id) || grid_id === nothing || grid_id == 0)  && continue
        n = if grid_id isa Symbol
            found = findfirst(k -> k === grid_id, keys(grids))
            found === nothing && throw(ArgumentError("$grid_id is not in $(keys(grids))"))
            found
        else
            grid_id
        end
        # Run processor for section
        section = grid2image(processors(p)[n], minval[n], maxval[n], data, grids[n], t)
        # Copy section into image
        for x in 1:size(section, 1), y in 1:size(section, 2)
            img[x + (i - 1) * sze[1], y + (j - 1) * sze[2]] = section[x, y]
        end
    end
    img
end


"""
    savegif(filename::String, o::Output, data; [processor=processor(o)], [kwargs...])

Write the output array to a gif. You must pass a processor keyword argument for any
`Output` objects not in `ImageOutput` (which allready have a processor attached).

Saving very large gifs may trigger a bug in Imagemagick.
"""
savegif(filename::String, o::Output, ruleset=Ruleset();
        processor=processor(o), minval=minval(o), maxval=maxval(o), kwargs...) = begin
    images = map(frames(o), collect(firstindex(o):lastindex(o))) do frame, t
        grid2image(processor, minval, maxval, ruleset, frame, t)
    end
    array = cat(images..., dims=3)
    FileIO.save(filename, array; kwargs...)
end


# Color manipulation tools

"""
    normalise(x, min, max)

Set a value to be between zero and one, before converting to Color.
min and max of `nothing` are assumed to be 0 and 1.
"""
normalise(x, minval::Number, maxval::Number) =
    min((x - minval) / (maxval - minval), oneunit(x))
normalise(x, minval::Number, maxval::Nothing) =
    (x - minval) / (onunit(minval) - minval)
normalise(x, minval::Nothing, maxval::Number) = min(x / maxval, oneunit(x))
normalise(x, minval::Nothing, maxval::Nothing) = x

"""
    scale(x, min, max)

Rescale a value between 0 and 1 to be between `min` and `max`.
This can be used to shrink the range of a colorsheme that is displayed.
min and max of `nothing` are assumed to be 0 and 1.
"""
scale(x, min, max) = x * (max - min) + min
scale(x, ::Nothing, max) = x * max
scale(x, min, ::Nothing) = x * (oneunit(min) - min) + min
scale(x, ::Nothing, ::Nothing) = x

"""
    rgb24(val)

Convert a number, tuple or color to an RGB24 value.
"""
rgb24(vals::Tuple) = RGB24(vals...)
rgb24(vals...) = RGB24(vals...)
rgb24(val::Number) = RGB24(val)
rgb24(val::Color) = RGB24(val)
rgb24(val::RGB24) = val
"""
    rgb24(scheme, val)

Convert a color scheme and value to an RGB24 value.
"""
rgb24(scheme, val) = RGB24(get(scheme, val))

"""
    combinebands(c::Tuple{Vararg{<:BandColor}, acc, xs)

Assign values to color bands given in any order, and output as RGB24.
"""
combinebands(colors, xs) = combinebands(colors, xs, (0.0, 0.0, 0.0))
combinebands(c::Tuple{Red,Vararg}, xs, acc) =
    combinebands(tail(c), tail(xs), (acc[1] + xs[1], acc[2], acc[3]))
combinebands(c::Tuple{Green,Vararg}, xs, acc) =
    combinebands(tail(c), tail(xs), (acc[1], acc[2] + xs[1], acc[3]))
combinebands(c::Tuple{Blue,Vararg}, xs, acc) =
    combinebands(tail(c), tail(xs), (acc[1], acc[2], acc[3] + xs[1]))
combinebands(c::Tuple{Nothing,Vararg}, xs, acc) =
    combinebands(tail(c), tail(xs), acc)
combinebands(c::Tuple{}, xs, acc) = RGB24(acc...)

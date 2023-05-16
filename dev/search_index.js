var documenterSearchIndex = {"docs":
[{"location":"#Stencils","page":"Stencils","title":"Stencils","text":"","category":"section"},{"location":"","page":"Stencils","title":"Stencils","text":"Modules = [Stencils]\nOrder = [:module, :type, :function]","category":"page"},{"location":"#Stencils.AbstractKernelStencil","page":"Stencils","title":"Stencils.AbstractKernelStencil","text":"AbstractKernelStencil <: Stencil\n\nAbstract supertype for kernel stencils.\n\nThese can wrap any other stencil object, and include a kernel of the same length and positions as the stencil.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.AbstractPositionalStencil","page":"Stencils","title":"Stencils.AbstractPositionalStencil","text":"AbstractPositionalStencil <: Stencil\n\nPositional stencils are tuples of coordinates that are specified in relation to the central point of the current cell. They can be any arbitrary shape or size, but should be listed in column-major order for performance.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.AbstractStencilArray","page":"Stencils","title":"Stencils.AbstractStencilArray","text":"AbstractStencilArray <: StaticArray\n\nSupertype for arrays with a Stencil, a BoundaryCondition, and Padding.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.AbstractSwitchingStencilArray","page":"Stencils","title":"Stencils.AbstractSwitchingStencilArray","text":"AbstractSwitchingStencilArray\n\nAbstract supertype for AbstractStencilArray that wrap two arrays that  switch places with each broadcast.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.AngledCross","page":"Stencils","title":"Stencils.AngledCross","text":"AngledCross <: Stencil\n\nAngledCross(; radius=1, ndims=2)\nAngledCross(radius, ndims)\nAngledCross{R,N}()\nAngledCross{R,N}()\n\nA neighboorhood where offsets of zero on at least N-1 axes are included in the neighborhoods\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.BackSlash","page":"Stencils","title":"Stencils.BackSlash","text":"BackSlash <: Stencil\n\nBackSlash(; radius=1, ndims=2)\nBackSlash(radius, ndims)\nBackSlash{R,N}()\nBackSlash{R,N}()\n\nA neighboorhood where offsets of zero on at least N-1 axes are included in the neighborhoods\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.BoundaryCondition","page":"Stencils","title":"Stencils.BoundaryCondition","text":"BoundaryCondition\n\nAbstract supertype for flags that specify the boundary conditions. These determine what happens when a stencil extends outside of the grid.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Circle","page":"Stencils","title":"Stencils.Circle","text":"Circle <: Stencil\n\nCircle(; radius=1, ndims=2)\nCircle(radius, ndims)\nCircle{R,N}()\nCircle{R,N}()\n\nA circular stencil\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Conditional","page":"Stencils","title":"Stencils.Conditional","text":"Conditional <: Padding\n\nPadding that doesn't change the array size, but checks getindex for out-of-bounds indexing, and inserts padval with Remove or values from the other side of the array with Wrap.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Cross","page":"Stencils","title":"Stencils.Cross","text":"Cross <: Stencil\n\nCross(; radius=1, ndims=2)\nCross(radius, ndims)\nCross{R,N}()\nCross{R,N}()\n\nA cross-shaped neighboorhood where offsets of zero on at least N-1 axes are included in the neighborhoods\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.ForwardSlash","page":"Stencils","title":"Stencils.ForwardSlash","text":"ForwardSlash <: Stencil\n\nForwardSlash(; radius=1, ndims=2)\nForwardSlash(radius, ndims)\nForwardSlash{R,N}()\nForwardSlash{R,N}()\n\nA neighboorhood where offsets of zero on at least N-1 axes are included in the neighborhoods\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Halo","page":"Stencils","title":"Stencils.Halo","text":"Halo{X} <: Padding\n\nPadding that uses an in-memory halo around the array so that parts of a stencil that go off the edge of the array can index directly into it without a bounds check or any conditional. This has the benefit of possibly better performance during window broadcasts, but some downsides.\n\nIn :out mode, a whole new array is alocated, larger than the original. This may not be worth doing unless you are using it multiple times. with :in mode, the outside edge of the array is used as padding. This may be more accurate  as there are no boundary effects from using a padding value.:w\n\nExample\n\nhalo_in = Halo(:in)\nhalo_out = Halo(:out)\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Horizontal","page":"Stencils","title":"Stencils.Horizontal","text":"Horizontal <: Stencil\n\nHorizontal(; radius=1, ndims=2)\nHorizontal(radius, ndims)\nHorizontal{R,N}()\nHorizontal{R,N}()\n\nA horizontal bar\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Kernel","page":"Stencils","title":"Stencils.Kernel","text":"Kernel <: AbstractKernelStencil\n\nKernel(stencil, kernel)\n\nWrap any other stencil object, and includes a kernel of the same length and positions as the stencil.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Layered","page":"Stencils","title":"Stencils.Layered","text":"Layered <: Abstract\n\nLayered(layers::...)\n\nTuple or NamedTuple of stencils that can be used together.\n\nneighbors for Layered returns a tuple of iterators for each stencil layer.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Moore","page":"Stencils","title":"Stencils.Moore","text":"Moore <: Stencil\n\nMoore(; radius=1, ndims=2)\nMoore(radius, ndims)\nMoore{R,N}()\nMoore{R,N}()\n\nMoore stencils define the stencil as all cells within a horizontal or vertical distance of the central cell. The central cell is omitted.\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Padding","page":"Stencils","title":"Stencils.Padding","text":"Padding\n\nAbstract supertype for padding modes, e.g.  Conditional and Halo.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Positional","page":"Stencils","title":"Stencils.Positional","text":"Positional <: AbstractPositionalStencil\n\nPositional(coord::Tuple{Vararg{Int}}...)\nPositional(offsets::Tuple{Tuple{Vararg{Int}}})\nPositional{O}()\n\nStencils that can take arbitrary shapes by specifying each coordinate, as Tuple{Int,Int} of the row/column distance (positive and negative) from the central point.\n\nThe stencil radius is calculated from the most distant coordinate. For simplicity the window read from the main grid is a square with sides 2r + 1 around the central point.\n\nThe dimensionality N of the stencil is taken from the length of the first coordinate, e.g. 1, 2 or 3.\n\nExample radius R = 1:\n\nN = 1   N = 2\n\n ▄▄      ▀▄\n          ▀\n\nExample radius R = 2:\n\nN = 1   N = 2\n\n         ▄▄\n ▀ ▀▀   ▀███\n           ▀\n\nUsing the O parameter e.g. Positional{((1, 2), (1, 1))}() removes any runtime cost of generating the stencil.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Remove","page":"Stencils","title":"Stencils.Remove","text":"Remove <: BoundaryCondition\n\nRemove()\n\nBoundaryCondition flag that specifies to assign padval to cells that overflow  grid boundaries.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Stencil","page":"Stencils","title":"Stencils.Stencil","text":"Stencil <: StaticVector\n\nStencils define a pattern of neighboring cells around the current cell. They reduce the dimensions of the neighborhood values into a StaticVector of neighbor values.\n\nStencils objects are updated to contain the neighbors of a location. This is so that user functions can be passed a single object from whitch they can retreive neighbors, distances to neighbors and other information, rather than having this in multiple objects.\n\nStencils also provide a range of compile-time utility funcitons like distances and offsets.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.StencilArray","page":"Stencils","title":"Stencils.StencilArray","text":"StencilArray <: AbstractStencilArray\n\nAn array with a Stencil and a BoundaryCondition, and Padding.\n\nFor most uses a StencilArray works exactly the same as a regular array.\n\nExcept it can be indexed at any point with stencil to return a filled Stencil object, or neighbors to return an SVector of neighbors.\n\nExample\n\n``` using Stencils A = StencilArray((1:10) * (10:20)'; stencil=Moore(2), boundary=Wrap()) A .*= 2 # Broadcast works as usual hood = stencil(A, 5, 10)\n\nouput\n\nMoore{1, 2, 8, StaticArraysCore.SVector{8, Int64}} █▀█ ▀▀▀ with neighbors: 8-element StaticArraysCore.SVector{8, Int64} with indices SOneTo(8):  144  180  216  152  228  160  200  240\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.SwitchingStencilArray","page":"Stencils","title":"Stencils.SwitchingStencilArray","text":"SwitchingStencilArray <: AbstractSwitchingStencilArray\n\nAn AbstractArray with a Stencil, a BoundaryCondition, Padding, and two array layers that are switched with each broadcast_stencil operation.\n\nThe use case for this operation is in simulations where stencil operations are repeatedly run over the same data, or where a filter (such as a blur) needs to be applied many times.\n\nFor most uses a SwitchingStencilArray works exactly the same as a regular array - the dest array can be safely ignored.\n\nExample\n\n``` using Stencils A = SwitchingStencilArray((1:10) * (10:20)'; stencil=Moore(2), boundary=Wrap()) A .*= 2 # Broadcast works as usual hood = stencil(A, 5, 10)\n\nouput\n\nMoore{1, 2, 8, StaticArraysCore.SVector{8, Int64}} █▀█ ▀▀▀ with neighbors: 8-element StaticArraysCore.SVector{8, Int64} with indices SOneTo(8):  144  180  216  152  228  160  200  240\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Vertical","page":"Stencils","title":"Stencils.Vertical","text":"Vertical <: Stencil\n\nVertical(; radius=1, ndims=2)\nVertical(radius, ndims)\nVertical{R,N}()\nVertical{R,N}()\n\nA vertical bar\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.VonNeumann","page":"Stencils","title":"Stencils.VonNeumann","text":"VonNeumann <: Stencil\n\nVonNeumann(; radius=1, ndims=2)\nVonNeumann(radius, ndims)\nVonNeumann{R,N}()\nVonNeumann{R,N}()\n\nDiamond-shaped neighborhood (in 2 dimwnsions), without the central cell In 1 dimension it is identical to Moore.\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Window","page":"Stencils","title":"Stencils.Window","text":"Window <: Stencil\n\nWindow(; radius=1, ndims=2)\nWindow(radius, ndims)\nWindow{R,N}()\nWindow{R,N}()\n\nA neighboorhood of radius R that includes the central cell.\n\nUsing R and N type parameters removes runtime cost of generating the stencil, compated to passing arguments/keywords.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.Wrap","page":"Stencils","title":"Stencils.Wrap","text":"Wrap <: BoundaryCondition\n\nWrap()\n\nBoundaryCondition flag to wrap cordinates that boundary boundaries back to the opposite side of the grid.\n\n\n\n\n\n","category":"type"},{"location":"#Stencils.boundary-Tuple{Stencils.AbstractStencilArray}","page":"Stencils","title":"Stencils.boundary","text":"boundary(A::AbstractStencilArray)\n\nGet the BoundaryCondition object from an AbstractStencilArray.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.broadcast_stencil!-Tuple{Any, Stencils.SwitchingStencilArray, Vararg{AbstractArray}}","page":"Stencils","title":"Stencils.broadcast_stencil!","text":"broadcast_stencil!(f, dest, source::StencilArray, args...)\nbroadcast_stencil!(f, A::SwitchingStencilArray, args...)\n\nStencil broadcast where f is passed each stencil of src, writing the result of f to dest.\n\nFor SwitchingStencilArray the internal source and dest arrays are used, returning a switched version of the array.\n\ndest must either be smaller than src by the stencil radius on all sides, or be the same size, in which case it is assumed to also be padded.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.broadcast_stencil-Union{Tuple{N}, Tuple{T}, Tuple{Any, Stencils.AbstractStencilArray{<:Any, <:Any, T, N}, Vararg{AbstractArray}}} where {T, N}","page":"Stencils","title":"Stencils.broadcast_stencil","text":"broadcast_stencil(f, hood::Stencil, args...)\n\nSimple stencil application, where f is passed each stencil in A, returning a new array.\n\nThe result is smaller than A on all sides, by the stencil radius.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.diameter-Union{Tuple{Stencil{R}}, Tuple{R}} where R","page":"Stencils","title":"Stencils.diameter","text":"diameter(rule) -> Int\n\nThe diameter of a stencil is 2r + 1 where r is the radius.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.distance_zones-Tuple{Stencil}","page":"Stencils","title":"Stencils.distance_zones","text":"distance_zones(hood::Stencil)\n\nList all distance zones as a Tuple\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.distances-Tuple{Stencil}","page":"Stencils","title":"Stencils.distances","text":"distances(hood::Stencil)\n\nGet the center-to-center distance of each stencil position from the central cell, so that horizontally or vertically adjacent cells have a distance of 1.0, and a diagonally adjacent cell has a distance of sqrt(2.0).\n\nValues are calculated at compile time, so distances can be used with little overhead.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.indices","page":"Stencils","title":"Stencils.indices","text":"indices(x::Stencil, I::Tuple) -> iterable\n\nReturns an indexable iterable of Tuple indices of each neighbor in the main array.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.inner_axes-Tuple{Any, Any}","page":"Stencils","title":"Stencils.inner_axes","text":"inner_axes(A, radius)\n\nRemove padding of radius from axes of A, returning a Tuple of UnitRange. radius can be a Stencil, an Int, or a tuple of tuples, e.g. for 2d it could be: ((1, 2), (2, 1))::Tuple{Tuple{Int,Int},Tuple{Int,Int}}.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.inner_view-Tuple{Any, Any}","page":"Stencils","title":"Stencils.inner_view","text":"inner_view(A, radius)\n\nRemove padding of radius from array A, returning a view of A.\n\nradius can be a Stencil, an Int, or a tuple of tuples, e.g. for 2d it could be: ((1, 2), (2, 1))::Tuple{Tuple{Int,Int},Tuple{Int,Int}}.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.kernel","page":"Stencils","title":"Stencils.kernel","text":"kernel(hood::AbstractKernelStencil) => iterable\n\nReturns the kernel object, an array or iterable matching the length of the stencil.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.kernelproduct","page":"Stencils","title":"Stencils.kernelproduct","text":"kernelproduct(hood::AbstractKernelStencil)\nkernelproduct(hood::Stencil, kernel)\n\nReturns the vector dot product of the stencil and the kernel, although differing from dot in that the dot product is not taken iteratively for members of the stencil - they are treated as scalars.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.kernelproduct-Tuple{Stencils.AbstractKernelStencil}","page":"Stencils","title":"Stencils.kernelproduct","text":"kernelproduct(hood::AbstractKernelStencil)\nkernelproduct(hood::Stencil, kernel)\n\nTake the vector dot produce of the stencil and the kernel, without recursion into the values of either. Essentially Base.dot without recursive calls on the contents, as these are rarely what is intended.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.neighbor_getindex-Tuple{Stencils.AbstractStencilArray, CartesianIndex}","page":"Stencils","title":"Stencils.neighbor_getindex","text":"neighbor_getindex(A::AbstractStencilArray, I::CartesianIndex)\n\nGet an array value from the stencil neighborhood.\n\nThis method handles boundary conditions.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.neighbors","page":"Stencils","title":"Stencils.neighbors","text":"neighbors(x::Stencil) -> iterable\n\nReturns an indexable iterator for all cells in the stencil, either a Tuple of values or a range.\n\nCustom Stencils must define this method.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.neighbors-Tuple{Stencils.AbstractStencilArray, Tuple{Vararg{Int64, var\"#s75\"}} where var\"#s75\"}","page":"Stencils","title":"Stencils.neighbors","text":"neighbors(hood::Stencil, A::AbstractArray, I) => SArray\n\nGet a single stencil from an array, as a Tuple, checking bounds.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.offsets","page":"Stencils","title":"Stencils.offsets","text":"offsets(x) -> iterable\n\nReturns an indexable iterable over all cells in the stencil, containing Tuples of the offset from the central cell.\n\nCustom Stencils must define this method.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.outer_axes-Tuple{Any, Any}","page":"Stencils","title":"Stencils.outer_axes","text":"outer_axes(A, hood::Stencil{R})\nouter_axes(A, radius::Int)\n\nAdd padding to axes of array A, returning a Tuple of UnitRange. radius can be a Stencil, an Int, or a tuple of tuples, e.g. for 2d it could be: ((1, 2), (2, 1))::Tuple{Tuple{Int,Int},Tuple{Int,Int}}.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.pad_array-Tuple{Conditional, BoundaryCondition, Union{Layered, Stencil}, AbstractArray}","page":"Stencils","title":"Stencils.pad_array","text":"outer_array(A, radius; [padval])\n\nAdd padding of radius to array A, redurning a new array.\n\nradius can be a Stencil, an Int, or a tuple of tuples, e.g. for 2d it could be: ((1, 2), (2, 1))::Tuple{Tuple{Int,Int},Tuple{Int,Int}}.\n\npadval defaults to zero(eltype(A)).\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.padding-Tuple{Stencils.AbstractStencilArray}","page":"Stencils","title":"Stencils.padding","text":"padding(A::AbstractStencilArray)\n\nGet the Padding object from an AbstractStencilArray.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.radius","page":"Stencils","title":"Stencils.radius","text":"radius(stencil) -> Int\n\nReturn the radius of a stencil.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.setneighbors","page":"Stencils","title":"Stencils.setneighbors","text":"setneighbors(x::Stencil, neighbors::StaticArray)\n\nUpdate the eighbors of a Stencil, returning and identical object with new values.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.stencil","page":"Stencils","title":"Stencils.stencil","text":"stencil(A::AbstractStencilArray, I::Tuple)\n\nGet a Stencil with neighbors updated for indices I.\n\n\n\n\n\n","category":"function"},{"location":"#Stencils.unsafe_neighbors-Tuple{Stencils.AbstractStencilArray, CartesianIndex}","page":"Stencils","title":"Stencils.unsafe_neighbors","text":"unsafe_neighbors(hood::Stencil, A::AbstractArray, I) => SArray\n\nGet a single stencil from an array, as a Tuple, without checking bounds of I.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.unsafe_update_stencil-Tuple{Stencils.AbstractStencilArray, CartesianIndex}","page":"Stencils","title":"Stencils.unsafe_update_stencil","text":"unsafe_update_stencil(x, A::AbstractArray, I) => Stencil\n\nSet the neighbors of a stencil to values from the array A around index I, without checking bounds of I.\n\n\n\n\n\n","category":"method"},{"location":"#Stencils.update_stencil-Tuple{Stencils.AbstractStencilArray, CartesianIndex}","page":"Stencils","title":"Stencils.update_stencil","text":"update_stencil(x, A::AbstractArray, I) => Stencil\n\nSet the neighbors of a stencil to values from the array A around index I. Bounds checks will reduce performance, aim to use unsafe_setneighbors directly.\n\n\n\n\n\n","category":"method"}]
}

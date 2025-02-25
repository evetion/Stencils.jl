# Stencils

Main functions

```@docs
mapstencil
mapstencil!
```

## Stencils

```@docs
Stencil
NamedStencil
AngledCross
BackSlash
Circle
Cross
Diamond
ForwardSlash
Kernel
Horizontal
Layered
Moore
Positional
Rectangle
Vertical
VonNeumann
Window
Annulus
Cardinal
Ordinal
```

## Stencil functions

These can be called on any `<: Stencil` object, and `Layered`.

```@docs
stencil
neighbors
center
offsets
indices
distances
radius
diameter
Stencils.distance_zones
Stencils.kernel
Stencils.kernelproduct
Stencils.unsafe_neighbors
Stencils.unsafe_stencil
Stencils.rebuild
Stencils.getneighbor
```

## Boundary Conditions

```@docs
Stencils.BoundaryCondition
Remove
Use
Wrap
Reflect
```

## Padding

```@docs
Stencils.Padding
Conditional
Halo
```

## Stencil Arrays

```@docs
Stencils.AbstractStencilArray
StencilArray
Stencils.AbstractSwitchingStencilArray
SwitchingStencilArray
```

Methods on stencil arrays:

```@docs
Stencils.boundary
Stencils.padding
Stencils.switch
```

# Direct Drive

AFC has the ability to use direct loading straight to the extruder/toolhead. There should be no hub in-between that lane
and the extruder when this option is used. Using `direct` will disable the ability to use the automatic calibration
functions.

To enable `direct` mode, the following line needs to be added to the `[AFC_stepper <lane_name>]` section in your
configuration:

``` cfg
hub: direct
```

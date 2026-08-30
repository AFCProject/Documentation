# Quiet Mode

AFC has the ability to run motors at slower speed when doing loads to reduce motor noise. This is helpful for those that
may have a printer in their bedroom and would like to run multicolor prints overnight. To enable quiet mode there is a
filament switch under your filament sensor called `Quiet Mode`, once this is enabled AFC will do long moves at a slower
speed(default: 50mm/s). Quiet mode speed does not apply to PTFE calibrations and lane resets.  

Speed for quiet mode can be updated by setting `quiet_moves_speed` variable in either `[AFC]` section, or
`[AFC_stepper <name>]` [section](../configuration/AFC_UnitType_1.cfg.md#afc_stepper-lane_name-section) (adding here
override setting in `[AFC]` [section](../configuration/AFC.cfg.md#afc-section)).

!!! tip

    Quiet mode can be enabled / disabled via the `Quiet Mode` filament switch in the web GUI (Mainsail / Fluidd).
    Alternatively, you can use the following macro to enable/disable quiet mode:
    
    - `SET_FILAMENT_SENSOR SENSOR=quiet_mode ENABLE={0 | 1}`


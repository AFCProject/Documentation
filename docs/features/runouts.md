# Detecting runouts
AFC has the ability to detect runouts or filament breakage while printing. If filament is not detected at the toolhead
or hub sensors while printing, then a pause command is issued with an error message stating what happened so the error
can be fixed before resuming the print.  

During printing if the PREP sensor goes low, one of two things can happen.  

- If infinite spool is not set for the lane that the PREP sensor went low on, AFC will issue a pause command so the
  issue can be fixed before resuming print. Note: If `unload_on_runout: True` is set in AFC config section, lane will be
  unloaded from toolhead after pausing.
- If infinite spool is set for the lane with [SET_RUNOUT](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_SET_RUNOUT)
  macro (or a `runout_lane` set in the lane's config), AFC will swap the T(n) mapping over to the runout lane with
  [AFC_SWAP_MAPPING](../klipper/internal/spool.md#AFC_spool.AFCSpool.cmd_AFC_SWAP_MAPPING), unload filament from the empty
  lane, then load the runout lane. If tool loading was successful print will continue. If tool load was unsuccessful AFC
  will issue pause command and an error will be displayed.  

A debounce delay can also be added so that the sensor(s) need to be low for a period of time before triggering the
runout logic. By default, this is set to zero but can be changed by adding `debounce_delay: <delay_value>` to your AFC
config which is a global value. Debounce delay can also be added in AFC_extruder, AFC_hub, AFC_stepper, and AFC_lane
configs which override the global AFC setting. See configuration sections for each config for more information.

Runout detection can be turned off while printing by disabling sensor in web GUI. If PREP sensor is disabled this also
disables infinite spool. The state of the switches is not persistent and will reset to enabled when Klipper is
restarted.

Example of runout enabled/disabled:
![runout_enabled_disabled](../assets/images/runout_switch.png)

Additionally, AFC supports triggering a runout based on remaining weight of the filament spool. If
`auto_spool_switch: True` is set in your config, then AFC will trigger a runout if the weight of the filament spool gets
below the `auto_spool_switch_threshold` value set in your config. This functionality is useful when the manufacturer of
a filament spool leaves a hooked end at the end of the roll, which may prevent a normal runout from triggering properly.

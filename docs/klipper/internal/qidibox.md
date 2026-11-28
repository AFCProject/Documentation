## QIDI Box Related Commands

These commands control the QIDI Box's filament dryer through the `AFC_QidiBox` unit driver. They are registered per
unit (`UNIT=<unit name>`) and only when the unit has a `dryer_heater` configured. Lane moves, loads, ejects and
calibration on a QIDI Box use the regular AFC commands.

### Drying

-----
[AFC_QIDIBOX_DRY]
::: AFC_QidiBox.afcQidiBox.cmd_AFC_QIDIBOX_DRY
    options:
      docstring_style: numpy
      heading_level: 4

-----
[AFC_QIDIBOX_DRY_STOP]
::: AFC_QidiBox.afcQidiBox.cmd_AFC_QIDIBOX_DRY_STOP
    options:
      docstring_style: numpy
      heading_level: 4

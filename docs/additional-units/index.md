The AFC-Klipper-Add-On supports the use of multiple units. They can be any combination of supported unit types to include:

- BoxTurtle
- NightOwl
- HTLF
- Claymore
- QuattroBox
- OpenAMS
- ACE
- ViViD
- EMU

The `install-afc.sh` script has an option to install additional units. When running the script, you can select `A`
in order to access the additional unit menu. From there, you can select which additional units you would like to install. 

1. Choose the unit type from the numbered list.
1. Review the options for the new unit. The unit name defaults to the lowest free name for that type (for example `Turtle_2`)
   and cannot be a name that is already in use. Depending on the unit type, you can also set options such as the board type
   and the extruder the unit is connected to (shown only if your printer has more than one extruder).
1. For unit types that support it, choose whether the new unit has **its own buffer** (and which type) or **shares the buffer of an
   existing unit**. If you choose to share, you will be asked for the name of the existing buffer.
1. Select `I` to install the unit.

!!! note

    You must have at least one unit installed in order to install an additional unit. If the installer cannot find an existing unit
    in your `AFC` configuration directory, it will ask you to install your first unit from the main Install menu instead.

!!! note

    After installing an additional unit, quit and restart the script before installing another unit or making further
    changes, so that the current units are loaded correctly.

When installing additional units, the majority of the configuration files will be placed properly, however you *will*
need to perform some manual configuration in order to get the additional units working properly. This is because of
the myriad of different configurations that are possible.

Areas that will require manual configuration include:

- Updating lane numbering in the additional unit configuration file.
- Update the AFC_Indicator configuration to include the additional unit.

For example, if you were to install a BTT ViViD when a 4 lane boxturtle already existed, you would need to:

- Manually change the lane numbering from 1-4 to 5-8, and 
- Update all `AFC_Indicator_1` to `AFC_Indicator_3` and `AFC_Indicator_2` to `AFC_Indicator_4`

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
- Creality CFS

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

## Creality CFS

Extra Creality CFS boxes join the first box's RS-485 chain and share its 4-in-1 buffer, so the installer writes their
configuration for the chain instead of copying the template. Choose `A`, then `Creality CFS`; the name defaults to
`CFS_2`, `CFS_3` and so on. The new box's file (e.g. `AFC/AFC_CFS_2.cfg`) gets:

- the same `serial`, `hub` and `extruder` as the first box,
- the next free `box_addr` (a chain takes at most four boxes),
- the next free lane numbers (`lane5` to `lane8` for the second box), so no renumbering is needed,
- a `box_uid` placeholder (`000000000000000000000000`).

Every box on a chain needs `box_uid` once there is more than one. AFC can't tell the boxes apart by their position on
the chain, so the uid is what ties each `[AFC_CFS]` section to its box. Add one box at a time:

1. Before adding box 2, run `AFC_CFS_STATUS` and copy box 1's `box uid`. The installer asks for it the first time you add
   a box (pasting it is fine). If you skip it, the installer reminds you to set it before restarting Klipper.
1. Connect the new box (box 1 OUT to the new box's IN) and its tube to the next input on the 4-in-1 buffer, power it on and
   restart Klipper. `AFC.log` names the new box's uid ("isn't in any [AFC_CFS] section").
1. Put that uid in the new box's `box_uid`, restart Klipper, then power-cycle the boxes once.
1. Check it: put a spool in slot A of the new box. The lane the installer gave it (e.g. `lane5`) should show as ready.
1. Repeat for the next box.

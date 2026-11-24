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

The first box is the one with the lowest `box_addr`. If your boxes are on more than one serial port (more than one
chain), the installer adds the new box to the first box's chain and warns you; for another chain, change `serial`,
`box_addr` and `hub` in the new file yourself.

Every box on a chain needs `box_uid` once there is more than one. AFC can't tell the boxes apart by their position on
the chain, so the uid is what ties each `[AFC_CFS]` section to its box. Add one box at a time:

1. If you are adding box 2, get box 1's uid first: run `AFC_CFS_STATUS UNIT=CFS_1` in the console and copy the 24 hex
   digits after `box uid:`. (Box 1's file has no `box_uid` yet; boxes 3 and 4 skip this step, because box 1's uid is
   already set by then.)
1. Run `install-afc.sh`, choose `A`, then `Creality CFS`, review the name and select `I`. While adding box 2, the same
   run asks for box 1's uid: paste it and the installer adds `box_uid` to box 1's `[AFC_CFS]` section. If you press
   Enter to skip it, add the line yourself before quitting: in `AFC/AFC_CFS_1.cfg`, under `[AFC_CFS CFS_1]`, add
   `box_uid: <the 24 hex digits>`. With two boxes configured and one without a uid, Klipper stops with a `box_uid`
   error. Then quit the installer with `Q`. Quitting restarts Klipper if the printer is idle; if it is busy, restart
   Klipper yourself once it is.
1. With the CFS power adapter unplugged, move the buffer's 485 cable from the last box to the new box, and connect the
   last box to the new box's other port, so the buffer stays at the end of the chain. Connect the new box's tube to the
   next input on the 4-in-1 buffer, plug the power adapter back in and restart Klipper. A warning in the console (also
   in `AFC.log`) names the new box's uid: "box uid ... isn't in any [AFC_CFS] section". `AFC_CFS_STATUS` only shows the
   uid of a box that is already configured, so this warning is where a new box's uid comes from.
1. In the new box's file (e.g. `AFC/AFC_CFS_2.cfg`), replace the `box_uid` placeholder (`000000000000000000000000`) with
   that uid, restart Klipper, then unplug the CFS power adapter and plug it back in once.
1. Check it in the console after that restart: the new box prints `CFS Ready`, and each of its lanes (e.g. `lane5` to
   `lane8`) shows `EMPTY READY FOR SPOOL` or `FILAMENT PRESENT`, not `CFS NOT RESPONDING`. A spool in slot A of the new
   box should then show on its first lane (e.g. `lane5`), which confirms the lanes belong to the box you just added.
1. For each further box, repeat from step 2.

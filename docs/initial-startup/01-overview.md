# Initial Startup & Commissioning Guide

The following guide will help you on the journey to multicolor printing after you have physically completed
the assembly of your Automatic Filament Changer (AFC) unit. Throughout this initial startup section, make sure to select
the appropriate unit type (e.g. Boxturtle, HTLF, etc.).

=== "BoxTurtle"

    [BoxTurtle Assembly Manual](https://armoredturtle.xyz/manual-sections.html?manual=boxturtle)

    --8<-- "includes/prerequisites.md"

=== "HTLF"

    [HTLF Assembly Manual](https://armoredturtle.xyz/manual-sections.html?manual=htlf)

    --8<-- "includes/prerequisites.md"

=== "ViViD"

    [ViViD Manual](https://github.com/bigtreetech/BIGTREETECH_ViViD/blob/master/BIGTREETECH_ViViD_User_Manual%20V1.0.2.pdf)

    !!!warning
        If you are running Kalico, at least version v2026.06.00 needs to be installed to use ViViD's heater temperature sensor

    --8<-- "includes/prerequisites.md"

=== "EMU"
    [EMU docs](https://github.com/DW-Tas/EMU/tree/main/docs)
    [EMU manuals](https://github.com/DW-Tas/EMU/tree/main/Manuals)

    --8<-- "includes/prerequisites.md"

=== "Snapmaker U1"
    --8<-- "includes/u1/need_to_install_extended_fw.md"

    AFC-Klipper-Add-On has been included into [Snapmaker U1 Extended Firmware](https://github.com/paxx12-snapmaker-u1/SnapmakerU1-Extended-Firmware) provided by AFC team, this initial guide walks you through uploading the extended firmware and enabling a basic AFC config that operates all four toolheads in standalone mode([click here](../toolchanger/overview.md#toolchanger-overview) to learn more about what a standalone toolhead means for toolchangers).

    After installing the extended firmware and enabling full AFC-Klipper-Add-On, if you would like to add a BoxTurtle or any other automated filament changer to your U1, then revisit this initial startup guide for the appropriate filament changer.

    ## A couple of notes when using automated filament changer on U1
    - If you add a filament changer to your U1 you will need to use the [u1-klipper](https://github.com/Snapmaker/u1-klipper) firmware version when flashing your MCU. If this is not done then your filament changer MCU and U1-klipper firmware will not communicate correctly and will error out.
    - [Buffer ramming](../installation/buffer-ram-sensor.md) needs to be enabled for detecting when filament has reached the toolhead.

    Before installing and enabling AFC-Klipper-Add-On onto your U1, please take a second to [read](../toolchanger/snapmaker.md) over what U1 functions currently work and what functions do not work correctly when using AFC-Klipper-Add-On on your U1. 

    [Next step](03-install-plugin.md#snapmaker-u1)

## Install the AFC Klipper Add-On

=== "All Automated Filament Changers"

    Your AFC unit works with the [AFC Klipper Add-On](https://github.com/AFCProject/AFC-Klipper-Add-On). The rest of
    this guide will focus on configuring AFC for use with your unit.

    Follow the instructions on that GitHub for the latest details on installation and configuration, but at the time of writing
    this is the easy button:

    ```sh
    cd ~
    git clone https://github.com/AFCProject/AFC-Klipper-Add-On.git
    cd AFC-Klipper-Add-On
    ./install-afc.sh
    ```

    The default options for the park, cut, kick, wipe, and tip forming macros can be used if you don't know what to choose.
    These can all be changed later by editing `AFC/AFC.cfg` and doing a firmware restart.

    After the installation completes, you should now see an AFC folder in your printer configuration directory, along with
    several files in there named `AFC.cfg`, `AFC_Hardware.cfg`, `AFC_Macro_Vars.cfg`, and a unit-specific configuration
    file (e.g., `AFC_Turtle_1.cfg` for BoxTurtle). The exact filename depends on the unit type you chose during
    installation. If you do not see these files, or if you see duplicate files (e.g., your `printer.cfg`) -
    this may be a caching issue with your web UI (Mainsail/Fluidd). Force a refresh with shift-reload or Ctrl+F5 and the
    problem should resolve itself.

    ### Post-Installation Configuration
    After installation, please ensure you update the following settings:

    - In your unit-specific config file (e.g., `AFC/AFC_Turtle_1.cfg` for BoxTurtle):
        - `canbus_uuid` if using CAN bus
        - `serial` if using USB
    - In `AFC/AFC_Hardware.cfg`
        - `pin_tool_start` and/or `pin_tool_end`

    In your `printer.cfg`'s `[extruder]` section, update the setting `max_extrude_only_distance` to the value 400. If
    the setting is not there, add it:

    `max_extrude_only_distance: 400`

    Depending on your configuration, you may also need to add the following line to your `printer.cfg`'s `[extruder]` section:

    `max_extrude_cross_section: 50`

    However, this should only be added if a warning appears in the logs about the extruder cross-section being too small.
    If you do not see this warning, you can skip this step.

    Review all x,y,z positions in the `AFC/AFC_Macro_Vars.cfg` file to ensure they are correct for your printer for any macros
    you have enabled.


    For best results, reboot your printer after installing the Add-On and including it in your printer.cfg. This will ensure
    all required modules are enabled.

=== "Snapmaker U1"
    <a id="snapmaker-u1"></a>
    --8<-- "includes/u1/warning.md"

    Currently not implemented into Snapmaker U1 Extended Firmware by paxx12, currently binaries can be found in AFCProject discord.

    If you have __Snapmaker U1 Extended Firmware__ already installed, you can follow steps 1-4 on the [update](../updates/updates.md#snapmaker-u1-printer) page and then come back to this page and finish steps 4-7

    1. Before installing, please make sure to fully unload all filament thats currently loaded into your toolheads.
    <!--  Removing below until the changes actually make it into the extended firmware repo 1. Navigate to Snapmaker U1 Extended Firmware [release page](https://github.com/paxx12-snapmaker-u1/SnapmakerU1-Extended-Firmware/releases) and download latest binary. -->
    1. Once binary is downloaded follow [Snapmaker U1 Extended Firmware installation instructions](https://snapmakeru1-extended-firmware.pages.dev/install)
    1. Once installation is done, to enable AFC-Klipper-Add-On open your web browser and navigate to `http://<ip-address>/firmware-config`. Be sure to replace `<ip-address>` with your Snapmaker U1 IP address.
    1. Navigate down to tweaks section and in the drop down for Enable AFC-Klipper-Add-On, choose `Enable`, then select `Confirm`
    ![afc_enable](../assets/images/u1/afc_u1_enable.png)
    1. Once that is done and the box shows `SUCCESS: Setting updated successfully`, navigate back to your printers fluidd interface. If enable was done correctly, the T0-T31 tools should now only show T0-T3 and your AFC panel should look something like below and there should not be any Klipper errors.
    ![afc_enabled](../assets/images/u1/afc_u1_enabled.png)
    1. The error that shows up is normal and can be ignored and closed out with the `x` on the right. If it keeps showing up please consult for help in the AFCProject discord.

    <!--
    Commenting this out for now since we have found that the PTFE inside can move
    --8<-- "includes/snapmaker-u1-ptfe.md"
    -->

    [Next Step](09-slicer-config.md#snapmaker-u1)
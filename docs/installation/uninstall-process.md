# Uninstall the AFC-Klipper-Add-On 

While we are sad to see you go, uninstalling the AFC-Klipper-Add-On is a simple process.

## Uninstalling the AFC-Klipper-Add-On

1. Navigate to the `AFC-Klipper-Add-On` directory
   - `cd ~/AFC-Klipper-Add-On`

2. Uninstall the `AFC-Klipper-Add-On` using the installation script.
   - `./install-afc.sh`

When the installation script starts, on the main menu there is an option for `R. Remove AFC Klipper Add-On`.

Selecting this option will:

- Remove the symlinks to the AFC python extensions from your Klipper `extras` directory
- Remove the `[include AFC/*.cfg]` line from your `printer.cfg` file
- Move your `~/printer_data/config/AFC` directory to `~/printer_data/config/AFC.backup.<timestamp>`, so that your
  configuration is preserved

You can verify the uninstallation process was successful by running the following command:

```bash
ls -l ~/klipper/klippy/extras/AFC*.py
```

No files should be returned. If by some chance, files are present, you can remove them manually. 

The uninstallation process does not modify your `moonraker.conf` file. If the installer added the AFC update manager to
your `moonraker.conf`, you may want to manually remove the `[update_manager afc-software]` section.

### Restarting Klipper

The installer restarts Klipper for you when it is safe to do so. After an uninstall (and when you exit the installer after
installing or updating), it asks Moonraker for the printer state and restarts the `klipper` service only if the printer is
not currently printing. If a restart is not possible, the installer prints a warning and leaves Klipper running, and you
should restart Klipper yourself once the printer is idle:

```bash
sudo service klipper restart
```

!!! note

    The installer restarts the service named `klipper`. If your Klipper service has a different name, restart it manually.

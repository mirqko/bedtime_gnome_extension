const { St, Clutter, GLib } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

let button;
let countdownItem;
let timeoutId = null;
let shutdownAt = null;

function init() {}

function enable() {
    button = new PanelMenu.Button(0.0, "Shutdown Timer");

    const label = new St.Label({
        text: "🌙",
        y_align: Clutter.ActorAlign.CENTER
    });
    button.add_child(label);

    addShutdownItem("Shutdown in 10 min", 10);
    addShutdownItem("Shutdown in 30 min", 30);
    addShutdownItem("Shutdown in 60 min", 60);

    button.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

    const cancelItem = new PopupMenu.PopupMenuItem("Cancel Shutdown");
    cancelItem.connect("activate", cancelShutdown);
    button.menu.addMenuItem(cancelItem);

    button.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

    countdownItem = new PopupMenu.PopupMenuItem(
        "No Shutdown scheduled",
        { reactive: false }
    );
    button.menu.addMenuItem(countdownItem);

    Main.panel.addToStatusArea("bedtime-timer", button, 1, "right");

    updateCountdown();
}

function disable() {
    if (timeoutId) {
        GLib.source_remove(timeoutId);
        timeoutId = null;
    }
    button.destroy();
}

function addShutdownItem(label, minutes) {
    const item = new PopupMenu.PopupMenuItem(label);

    item.connect("activate", () => {
        GLib.spawn_command_line_async(
            `shutdown -h +${minutes}`
        );
        shutdownAt = Date.now() + minutes * 60 * 1000;
        updateCountdown();
    });

    button.menu.addMenuItem(item);
}

function cancelShutdown() {
    GLib.spawn_command_line_async("shutdown -c");
    shutdownAt = null;
    countdownItem.label.text = "Shutdown canceled";
}

function updateCountdown() {
    if (timeoutId) {
        GLib.source_remove(timeoutId);
    }

    timeoutId = GLib.timeout_add_seconds(
        GLib.PRIORITY_DEFAULT,
        1,
        () => {
            if (!shutdownAt) {
                countdownItem.label.text = "No Shutdown scheduled";
                return true;
            }

            const remaining = shutdownAt - Date.now();
            if (remaining <= 0) {
                shutdownAt = null;
                countdownItem.label.text = "Shutting down...";
                return false;
            }

            const totalSeconds = Math.floor(remaining / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            countdownItem.label.text =
                `Shutdown in ${minutes}:${seconds.toString().padStart(2, "0")}`;

            return true;
        }
    );
}

const {St, Clutter} = imports.gi;
const Main = imports.ui.main;
let panelButton, panelButtonText;

function setButtonText () {
  //panelButtonText.set_text("test");
  return true;
}

function init () {
  panelButton = new St.Bin({style_class : "panel-button"});
  panelButtonText = new St.Label({style_class : "examplePanelText",
                                  text : "mirqo",
                                  y_align: Clutter.ActorAlign.CENTER});
  panelButton.set_child(panelButtonText);
}

function enable () {
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
}

function disable () {
  Main.panel._rightBox.remove_child(panelButton);
}

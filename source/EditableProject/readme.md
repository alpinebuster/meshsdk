# Editable Project

To Create your own plugins for MeshSDK/MeshInspector you can simply add cpp files to this project (find example in `HelloWorldPlugin.cpp`).
Add corresponding records in `MRRibbonEditableMenuStructure.ui.json` and `MRRibbonEditableMenuStructure.items.json`.

Add this project to MeshSDK solution and compile it together. Then you will be able to take target files and put it near MeshInspector.exe (or MeshViewer.exe)

Target files:
 - EditableProject.dll (EditableProject.so on linux)
 - EditableProject.lib (not present on linux)
 - MRRibbonEditableMenuStructure.items.json
 - MRRibbonEditableMenuStructure.ui.json

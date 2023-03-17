/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "camera/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("camera.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var oRootPath = jQuery.sap.getModulePath("camera"); // your resource root
		
                var oPathModel = new sap.ui.model.json.JSONModel({
                    path : oRootPath,
                });
                        
                this.setModel(oPathModel, "pathModel");
            }
        });
    }
);
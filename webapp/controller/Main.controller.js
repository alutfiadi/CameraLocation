/* global Webcam:true */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/HTML'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        HTML) {
        "use strict";

        return Controller.extend("camera.controller.Main", {
            onInit: function () {
                this.bRetake = this.getView().byId("bRetake");
                this.bTake = this.getView().byId("bTake");
                this.boxVideo = this.getView().byId("boxVideo");
                this.boxCanvas = this.getView().byId("boxCanvas");

            },
            onAfterRendering: function () {
                var webID = this.createId("webcam"); // this == controller instance
                this.webcamElement = document.getElementById(webID);
                var canvasID = this.createId("canvas");
                this.canvasElement = document.getElementById(canvasID);
                // var snapSoundID = this.createId("snapSound");
                // this.snapSoundElement = document.getElementById(snapSoundID);

                console.log("Webcam ", this.webcamElement);
                console.log("canvasElement ", this.canvasElement);
                // console.log("snapSoundElement ", this.snapSoundElement);

                this.webcam = new Webcam(this.webcamElement, 'user', this.canvasElement, null);
                this.webcam.start()
                    .then(result => {
                        console.log("webcam started");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                
                    
                this.boxCanvas.setVisible(false);

            },
            
            takePhoto: function (){
                this.boxCanvas.setVisible(true);
                this.boxVideo.setVisible(false);
                var picture = this.webcam.snap();
                //console.log(picture);
                this.aftertakePhoto();
            },

            aftertakePhoto: function(){
                this.webcam.stop();
                this.bTake.setVisible(false);
                this.bRetake.setVisible(true);
                this.getCurrentLocation();
            },

            reTakePhoto: function() {
                this.bTake.setVisible(true);
                this.bRetake.setVisible(false);
                this.boxCanvas.setVisible(false);
                this.boxVideo.setVisible(true);
                this.startCamera();
            },

            startCamera: function () {
                this.webcam = new Webcam(this.webcamElement, 'user', this.canvasElement, null);
                this.webcam.start()
                    .then(result => {
                        console.log("webcam started");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    
            },
            getCurrentLocation: function() {
                var that = this;
                navigator.geolocation.getCurrentPosition(function(position) {
                    that.getView().byId("IdLatitude").setValue(position.coords.latitude);
                    that.getView().byId("IdLongtitude").setValue(position.coords.longitude);
                    that.getView().byId("IdButtonLink").setVisible(true);
                });
            },
    
            goToMaps: function() {
                sap.m.URLHelper.redirect("https://www.google.com/maps/search/?api=1&query=" +
                    this.getView().byId("IdLatitude").getValue() + "," + this.getView().byId("IdLongtitude").getValue() + "", true);
            },
    

        });
    });

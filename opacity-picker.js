"use strict";

var op_picker = (function() {
    var opacity;
    var defaultOpacity = 0.5;
    var color;
    var defaultColor = '#999999';

    // References to DOM elements
    var container,
        bar,
        slider;

    function _initiate (id, opacityValue, colorValue) {

        // Initial opacity value
        opacity = opacityValue || defaultOpacity;
        // Initial color value
        color = colorValue || defaultColor;

        // Handle DOM Elements
        container = document.getElementById(id);
        container.classList.add('op-container');
        bar = document.createElement('div');
        bar.classList.add('op-bar');
        slider = document.createElement('div');
        slider.classList.add('op-slider');
        bar.append(slider);
        container.append(bar);

        // Set slider on start position
        setSliderPositionByOpacity(opacity);

        // Set initial bar color
        op_picker.setColor(color);

        // Attach event handlers
        bar.addEventListener('click', function(e) {
            moveSlider(e);
        })
        
        slider.addEventListener('mousedown', function (e) {
            document.addEventListener('mousemove', moveSlider)
        })

        document.addEventListener('mouseup', function (e) {
            document.removeEventListener('mousemove', moveSlider)
        })

        window.addEventListener("resize", function(e) {
            setSliderPositionByOpacity(opacity);
        });

    }

    function getSliderPosition (opacity) {
        // convert value to left position
        let availableWidth = bar.clientWidth - slider.offsetWidth;
        return +opacity * availableWidth;
    }

    function moveSlider(e) {
        // Move slider and update opacity
        let left = getLeftPosition(e);
        setSliderPosition(left);
        opacity = getRatio(left);
        op_picker.onChange(opacity);
    }

    function getLeftPosition (e) {
        // Set slider left position and return
        let offsetLeft = bar.getBoundingClientRect().left;
        let left = e.clientX - offsetLeft - (slider.offsetWidth * 0.5);

        // contain slider within bar
        left = left < 0 ? 0 : left;
        let aw = bar.clientWidth - slider.offsetWidth
        left = left > aw ? aw : left;
        
        return left;
    }

    function setSliderPosition (left) {
        slider.style.left = `${left}px`;
    }

    function setSliderPositionByOpacity (opacity) {
        // Set slider left position according to given opacity
        let pos = getSliderPosition(opacity)
        setSliderPosition(pos);
    }

    function getRatio (left) {
        // Get ( slider position / bar width ) ratio
        let availableWidth = bar.clientWidth - slider.offsetWidth;
        let ratio = left / availableWidth;
        ratio = Math.floor(ratio * 100) / 100;
        return ratio;
    }

    return {
        init: function(id) {
            _initiate(id)
        },
        getColor: function () {
            return color;
        },
        setColor: function (colorValue) {
            color = colorValue;
            bar.style.background = `linear-gradient(to right, transparent, ${color})`;
        },
        getOpacity: function () {
            return opacity;
        },
        setOpacity: function (value) {
            // // convert value to left position
            setSliderPositionByOpacity(value)
            op_picker.onChange(value);
        },
        onChange: function (opacity) {
            console.log(opacity);
        }
    }

})()

op_picker.init('opacity-picker');


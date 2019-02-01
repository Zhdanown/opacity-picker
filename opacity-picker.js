"use strict";

var op_picker = (function() {
    var opacity;
    var defaultOpacityValue = 0.5;

    // References to DOM elements
    var container,
        bar,
        slider;

    function _initiate (id, opacityValue) {

        // Initial opacity value
        opacity = opacityValue || defaultOpacityValue;

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
            bar.style.backgroundColor;
            debugger;
        },
        setColor: function (color) {
            bar.style.background = `linear-gradient(to right, transparent, ${color})`
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

document.addEventListener('keypress', e => {
    if (e.key == 'w')
        op_picker.setColor('wheat')
    if (e.key == 'r')
        op_picker.setColor('coral')
    if (e.key == 'b')
        op_picker.setColor('dodgerblue')
    if (e.key == 'g')
        op_picker.setColor('lightgreen')

    let c = op_picker.getOpacity();
    
    op_picker.setOpacity(1)
    
})

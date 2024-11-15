// index.js
AFRAME.registerComponent('add-box', {
    schema: {
        position: {type: 'vec3', default: {x: 0, y: 1, z: -5}},
        color: {type: 'string', default: '#4CC3D9'}
    },
    init: function () {
        const data = this.data;
        const el = this.el;

        // Create a box element
        const box = document.createElement('a-box');
        box.setAttribute('position', data.position);
        box.setAttribute('color', data.color);
        box.setAttribute('shadow', '');

        // Append the box to the entity
        el.appendChild(box);
    }
});

// Initialize the A-Frame scene (if needed)
window.onload = function() {
    const scene = document.querySelector('a-scene');
    const entity = document.createElement('a-entity');
    entity.setAttribute('add-box', 'position: 1 0.5 -3; color: #FFC65D');
    scene.appendChild(entity);
};

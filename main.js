
//create a new scene
const scene = new THREE.Scene();


// create the camera, which defines where we'er looking at.
const camera = new THREE.PerspectiveCamera(
    75, //Field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);

scene.add(camera);
camera.position.z = 5 //move camera back 5 units




// create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({ antialias: false }); //antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); //set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); //add renderer to html


// Ambient light is a soft lifgt that lights up all the objects in the scene eaully
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); //color, intensity, distance,decay
ambientLight.position = camera.position; //light follows camera
scene.add(ambientLight);


// Directional light is a light source that acts like the sun, that illuminates all objects in the scene equally from a specific direction.
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); //color, intensity, distance, dcay
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); //BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({ color: 'blue' }); //MeshBasicMaterial is the look of the object(color or texture)
const cube = new THREE.Mesh(geometry, material); //create cube with geometry and material
scene.add(cube);


// controls
// EventListener for when we press the keys
document.addEventListener('keydown', onKeyDown, false);



// texture of the floor
const floorTexture = new THREE.ImageUtils.loadTexture('./img/floor.jpeg');

floorTexture.wrapS = THREE.ClampToEdgeWrapping; //wrapS is horizontal direction
floorTexture.wrapT = THREE.ClampToEdgeWrapping; //wrapT is vertical direction
floorTexture.repeat.set(20,20);//how many times to repeat the texture





// create the floor plane
const planeGeometry = new THREE.PlaneBufferGeometry(45,45); //BoxGeometry is the shape of the object
const planeMaterial = new THREE.MeshBasicMaterial({ //MeshBasicMaterial is the look of the object (color or textrue)
    map: floorTexture,
    side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

floorPlane.rotation.x = Math.PI/2; //90 degrees
floorPlane.position.y = -Math.PI; //-180 degrees

scene.add(floorPlane);



// create the walls
const wallGroup = new THREE.Group(); //create a group to hold the walls
scene.add(wallGroup);

// Front wall
const frontWall = new THREE.Mesh( //Mesh class that has geometry and material inside
    new THREE.BoxGeometry(50,20,0.001), //geometry
    new THREE.MeshLambertMaterial({color:'green'}) //LambertMaterial is for non-shiny surfaces

);

frontWall.position.z = -20;

// left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001), //geometry
    new THREE.MeshLambertMaterial({
        color:'red',
    })
);

leftWall.rotation.y = Math.PI/2;
leftWall.position.x = -20;

// right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshLambertMaterial({
        color:'yellow'
    })
);

rightWall.position.x = 20;
rightWall.rotation.y = Math.PI/2;

wallGroup.add(frontWall, leftWall, rightWall);

// loop throufgr each wall and create the bounding box
for(let i = 0; i< wallGroup.children.length ; i++){
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// create the ceiling
const ceilingGeometry = new THREE.PlaneBufferGeometry(50,50);
const ceilingMaterial = new THREE.MeshLambertMaterial({
    color:'blue',
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI/2;
ceilingPlane.position.y = 12;

scene.add(ceilingPlane);



// function when a key is pressed, execute this function
function onKeyDown(event){
    let keycode = event.which;

// right arrow key
if (keycode===39){
    camera.translateX(-0.05);
}
// left arrow key
else if(keycode=== 37){
    camera.translateX(0.05);
}
// up arrow key
else if(keycode===38){
    camera.translateY(-0.05);
}

// down arrow key
else if (keycode === 40){
    camera.translateY(0.05);
}

} 



// add images
const raycaster = new THREE.Raycaster();
const intersects = raycaster.intersectObjects(targetList);



let render = function(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera); //renders the scene

    requestAnimationFrame(render);

    raycaster.setFromCamera(pointer,camera);
    const intersects = rayaster.intersectObjects(scene.children);

    if(intersects.length > 0){
        TextureLoader.crossOrigin = "Anonymous"
        newTexture = textureLoader.load(image_urls[image_index]+ './img/rodin.jpeg');
        intersects[0].object.material= new THREE.MeshBasicMaterial({
            map: newTexture
        });
    };
 
}


// renderer
render();

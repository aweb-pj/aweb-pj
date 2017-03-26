import * as THREE from 'three'
let renderer = new THREE.WebGLRenderer()
renderer.setSize(400, 300)
document.getElementsByTagName('body')[0].appendChild(renderer.domElement)

let scene = new THREE.Scene()
let camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10)
camera.position.set(0, 0, 5)

scene.add(camera)

let cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  }))

scene.add(cube)

renderer.render(scene, camera)
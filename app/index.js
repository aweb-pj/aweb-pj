'use strict'

import * as THREE from 'three'
import _ from 'lodash'

let scene, camera, renderer
scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.set(3, 4, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

let regionR = 3
let cylinderMesh = new THREE.CylinderGeometry(regionR, regionR, 0.05, 1024)
let material = new THREE.MeshNormalMaterial()
let cylinder = new THREE.Mesh(cylinderMesh, material)
cylinder.position.set(0, 0, 0)
scene.add(cylinder)

function pointsGenerator (amount) {
  let pointsArr = []
  pointsArr = _.map(_.range(0, amount), () => {
    let r = Math.random() * regionR
    let θ = (2 * Math.PI / 360) * (Math.random() * 360)
    let polarPoint = {r, θ}

    let x = r * Math.cos(θ)
    let y = r * Math.sin(θ)
    let cartesianPoint = {x, y}
    return {polarPoint, cartesianPoint}
  })

  return pointsArr
}

function cubesGenerator (amount) {
  let cubesArr = []

  cubesArr = _.map(pointsGenerator(amount), ({polarPoint, cartesianPoint}) => {
    let cubeMesh = new THREE.BoxGeometry(0.2, regionR - polarPoint.r, 0.2)
    let cube = new THREE.Mesh(cubeMesh, material)
    cube.position.set(cartesianPoint.x, (regionR - polarPoint.r) / 2 + 0.025, cartesianPoint.y)
    return cube
  })

  return cubesArr
}

_.forEach(cubesGenerator(100), (cube) => {
  scene.add(cube)
})

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

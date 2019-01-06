<template>
    <div style="width:100%;height:500px;background:#eeeeee">
      <div id="container" ></div>
    </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from '../assets/js/OrbitControls.js'
import { CSS2DObject,CSS2DRenderer } from '../assets/js/CSS2DRenderer.js'
import { WEBGL } from '../assets/js/WebGL.js'
 var scene = ''
export default {
  data() {
    return {
      container: null,
      clock: null,
      camera: null,
      renderer: null,
      controls: null,
      labelRenderer: null,
    }
  },
  methods: {
    init: function() {
        this.container = document.getElementById("container");
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); 
        scene.add(new THREE.AmbientLight(0x888888) );
        //scene.add( new THREE.DirectionalLight( 0xffffff ,1.5) );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth/2, window.innerHeight /2);
        this.container.appendChild( this.renderer.domElement );
        
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        this.container.appendChild( this.labelRenderer.domElement );

        this.Draw(10,'A','B','C','D','E','F','R','r','a');//棱长，前六个点标注，后三个线标注
        var textureLoader=new THREE.TextureLoader();  
        window.addEventListener( 'resize', this.onWindowResize, false );
 
    },
    Draw(a,h,i,j,k,l,m,R,r,t) {
				
            if(isStr(h) && isStr(i) && isStr(j) && isStr(k) && isStr(l) && isStr(m) && isStr(R) && isStr(r) && isStr(t) && isNaN(a)==!true){}else return;
        
            var center = new THREE.Vector3(0,(a*Math.sqrt(6))/6,-(a*Math.sqrt(3))/6);
            var posZ = -(a/2)*Math.sqrt(3);
            
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.0001, 9999999 );
            this.camera.position.set(a,a,-a-a/2);
            
            var geom = new THREE.Geometry();
            
            var vertices = [
                
                new THREE.Vector3( a/2, 0, 0), 
                new THREE.Vector3(-a/2, 0, 0), 
                new THREE.Vector3(0, 0, posZ),
                new THREE.Vector3(0, center.y*2, center.z)
                
            ];
            
            geom.vertices = vertices;
            
            var faces = [
            
                new THREE.Face3(0,1,2),
                new THREE.Face3(0,3,1),
                new THREE.Face3(0,2,3),
                new THREE.Face3(2,1,3)
                
            ];

            geom.faces = faces;
            
            geom.computeFaceNormals();
            
            var mat = new THREE.MeshLambertMaterial({
            
                color: 0x000000,
                side: THREE.DoubleSide,
                wireframe: true
                
            });
            
            var mesh = new THREE.Mesh(geom, mat);
            
            scene.add(mesh);
            
            lineText(mesh,0,center.y,center.z*2,t);
            
            var sphereMaterial = new THREE.MeshLambertMaterial({
                
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.05,
                wireframe: true
                
            });
            
            var inSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(center.y/2,50,50),sphereMaterial);
            inSphere.position.set(0,center.y/2,center.z);
            scene.add(inSphere);
            
            var outSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(center.y*3/2,50,50),sphereMaterial);
            outSphere.position.set(0,center.y/2,center.z);
            scene.add(outSphere);
            
            var geom2 = new THREE.Geometry();
            
            var vertices2 = [
            
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, center.z),
                new THREE.Vector3(0, center.y*2, center.z)
                
            ];
            
            geom2.vertices = vertices2;
            
            var faces2 = [
            
                new THREE.Face3(0,1,2),
                
            ];

            geom2.faces = faces2;
            
            geom2.computeFaceNormals();
            
            var mat2 = new THREE.MeshLambertMaterial({
            
                color: 0xffff00,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5,
                
            });
            
            var mesh2 = new THREE.Mesh(geom2, mat2);
            
            lineText(mesh2,0,center.y/4,center.z,r);
            
            var mesh3 = new THREE.Mesh(geom2, mat);
            
            lineText(mesh3,0,center.y,center.z,R);
            
            scene.add(mesh2);
            scene.add(mesh3);
            
            point(a/2, 0, 0, h, !true);
            point(-a/2, 0, 0, i, !true);
            point(0, 0, posZ, j, !true);
            point(0, center.y*2, center.z, k, true);
            
            point(0, 0, 0, l,!true);
            point(0, 0, center.z, m,!true);
            point(0, center.y/2, center.z);

            this.controls = new OrbitControls( this.camera );
            this.controls.target.set(center.x,center.y,center.z);
            this.controls.enablePan = !true;
            this.clock = new THREE.Clock();
            let self = this;
            function point (x,y,z,str,istop) {
                var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(a/100,a,a),new THREE.MeshBasicMaterial({color: 0xff0000}));
                mesh.position.set(x,y,z);
                scene.add(mesh);
                
                if(str){
                    
                    var pointDiv = document.createElement( 'div' );
                    pointDiv.className = 'label';
                    pointDiv.textContent = str;
                    
                    if (istop) {
                        
                        pointDiv.style.marginTop = '-1em';
                    
                    } else {
                        
                        pointDiv.style.marginTop = '1.5em';
                        
                    }
                    
                    var pointLabel = new CSS2DObject( pointDiv );
                    pointLabel.position.set( 0, a/100, 0 );
                    mesh.add( pointLabel );
                    
                }
                
            }
            
            function lineText(obj,x,y,z,str){
                
                var lineDiv = document.createElement( 'div' );
                lineDiv.className = 'label';
                lineDiv.textContent = str;
                var lineLabel = new CSS2DObject( lineDiv );
                lineLabel.position.set( x, y, z );
                obj.add( lineLabel );
                
            }
            function isStr(value){
                if(typeof value=='string'&&value.constructor==String) return true;
                else return false;
            }
        },
        onWindowResize() {
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

        },
        animate: function() {
            requestAnimationFrame( this.animate );
            this.render();
        },
        render() {
            this.controls.update( this.clock.getDelta() );
            this.renderer.render( scene, this.camera );
            this.labelRenderer.render( scene, this.camera );
        }
    },
    mounted() {
        this.init();
        this.animate()
    }
}
</script>
<style scoped>
  #container {
    height: 400px;
  }
</style>

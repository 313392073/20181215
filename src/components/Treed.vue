<!--  -->
<template>
    <div id="container">
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
var container, clock, camera, scene, renderer, controls, labelRenderer;
import * as THREE from 'three'
import { OrbitControls } from '../assets/js/OrbitControls.js'
import { CSS2DObject,CSS2DRenderer } from '../assets/js/CSS2DRenderer.js'
import { WEBGL } from '../assets/js/WebGL.js'

export default {
//import引入的组件需要注入到对象中才能使用

data() {
//这里存放数据
return {
    initWeblg(){
        if ( WEBGL.isWebGLAvailable() === false ) {
            document.body.appendChild( WEBGL.getWebGLErrorMessage() );
        }
    },
    init() {
        container = document.getElementById("container");
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); 
        scene.add( new THREE.AmbientLight(0x888888) );
        //scene.add( new THREE.DirectionalLight( 0xffffff ,1.5) );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize( window.innerWidth, window.innerHeight );
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = 0;
        container.appendChild( labelRenderer.domElement );
        this.Draw(10,'A','B','C','D','E','F','R','r','a');//棱长，前六个点标注，后三个线标注
        var textureLoader=new THREE.TextureLoader();  
        // var axesHelper = new THREE.AxesHelper( 10 );
        // scene.add( axesHelper );
        window.addEventListener( 'resize', this.onWindowResize, false );
    },
    Draw (a,h,i,j,k,l,m,R,r,t) {
        if(isStr(h) && isStr(i) && isStr(j) && isStr(k) && isStr(l) && isStr(m) && isStr(R) && isStr(r) && isStr(t) && isNaN(a)==!true){}else return;
        var center = new THREE.Vector3(0,(a*Math.sqrt(6))/6,-(a*Math.sqrt(3))/6);
        var posZ = -(a/2)*Math.sqrt(3);
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.0001, 9999999 );
        camera.position.set(a,a,-a-a/2);
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

        controls = new OrbitControls( camera );
        controls.target.set(center.x,center.y,center.z);
        controls.enablePan = !true;
        clock = new THREE.Clock();
        
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
        renderer.setSize( window.innerWidth, window.innerHeight );
        labelRenderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    },
    animate() {
        console.log(requestAnimationFrame)
        requestAnimationFrame(this.animate);
        this.render();
    },
    render() {
        controls.update( clock.getDelta() );
        renderer.render( scene, camera );
        labelRenderer.render( scene, camera );
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$nextTick(() => {
        this.initWeblg()
        this.init();
        this.animate()
    })
    
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类


</style>
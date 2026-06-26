<script setup>
import { router } from '../../routes';


function sumbit(){
    alert("Se guardo el producto");
    router.push({name:'Products'});
}
</script>
<template>
    <h1>CREAR PRODUCTO</h1>
    <button @click.prevent="sumbit">GUARDAR PRODUCTO</button>
</template>
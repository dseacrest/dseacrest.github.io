<template>
    <div>
        Upload<br>
        <!-- <button v-on:click="uploadTasks()">UploadTasks</button> -->
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import ITodoCollection from '@/models/todoCollection';
import QInput from 'quasar';
import tendays from "../assets/mock-data/tendays.json";

@Component
export default class Upload extends Vue {
    public task: ITodoCollection = tendays;
    
    // public uploadTasks() {
    //     let todoDataService = new TodoDataServicesCollection();
               
    //     todoDataService.Add(this.task).then((listData:any) => {
    //         this.task = listData;
    //     });
    // }

}

</script>
import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Task } from './task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tasks: any = [];
  keys:any = [];
  data:any;
  constructor(navCtrl: NavController, public af: AngularFireDatabase) {
    var that = this;
    this.data = this.af.list('task');
    this.af.list('/task').valueChanges().subscribe((res)=>{
      that.tasks = res
    });
    this.af.list('/task').snapshotChanges().subscribe((res)=> {
      that.keys = res;
      console.log(that.keys);
    })
  }

  addItem() {
    let theNewTask: string = prompt("New Task");
    if (theNewTask !== '') {
      this.data.push({ title: theNewTask, status: 'open' });
    }
  }
  markAsDone(slidingItem: ItemSliding, i) {
    this.data.update(this.keys[i].key, { status: 'done' });
    //console.log(task.$key);
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, i) {
    this.data.remove(this.keys[i].key);
    slidingItem.close();
  }
}

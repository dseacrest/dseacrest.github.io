import db from '@/main';
import firebase from 'firebase';
import { ITodo } from '@/models/todoCollection';

export class FireStoreDataServices {

    addRecord(recordObject: any, tableName: string) {
        return new Promise(function (resolve, reject) {            
            db.collection(tableName).add(recordObject).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                resolve(docRef.id);
            })
            .catch(function (error: any) {
                console.error("Error adding document: ", error);
                reject(error);
            });
        });
    }

    updateRecord(recordObject: any, tableName: string, recordId: string) {
        return new Promise(function (resolve, reject) {
            console.log("record to be saved");
            db.collection(tableName).doc(recordId).set(recordObject).then(function (docRef) {
                resolve(recordObject);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                reject(error);
            });
        });
    }

    getRecord(recordID: string, tableName: string, docToRecordMap: any) {
        return new Promise(function (resolve, reject) {
            db.collection(tableName).doc(recordID).get().then(function (doc) {
                if (doc.exists) {
                    resolve(docToRecordMap(doc));
                } else {
                    reject("Record not found");
                }
            }).catch(function (error) {
                reject(error);
            });            
        });
    }

    deleteRecord(recordID: string, tableName: string) {
        return new Promise(function (resolve, reject) {
            db.collection(tableName).doc(recordID).delete().then(function (doc) {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    deleteTodoField(recordID: string, tableName: string, task: ITodo) {
        return new Promise(function (resolve, reject) {
            console.log(tableName);
            console.log(recordID);
            console.log(task);
            db.collection(tableName).doc(recordID).update({'todos': firebase.firestore.FieldValue.arrayRemove({id: task.id, body: task.body, title: task.title})}).then(function (doc) {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    getAll(tableName: string, docToRecordMap: any) {
        return new Promise(function (resolve, reject) {
    
            var records: any = [];
            db.collection(tableName)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        records.push(docToRecordMap(doc));
                    });
    
                    resolve(records);
                });
        });
    }
}
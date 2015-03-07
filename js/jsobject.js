"use strict";

function Man(name, age) {
    this.name = name;
    this.age = age;
    this.getUser = function() {
        console.log(this.name);
        console.log(this.age);
    }
}

var user = new Man("Bob", 45);


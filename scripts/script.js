"use strict";

class Contact {
  constructor(name, phone, email, relation) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.relation = relation;
  }
  //returns a properly formatted string for this contact
  print() {
    return `${this.name} | P: ${this.phone} | E: ${this.email} | R: ${this.relation}`;
  }
}

class AddressBook {
  constructor() {
    this.contacts = [
      new Contact("Kazuma Kiryu", "080.1234.5678", "kiryu@dragonofdojima.net", "My Dude"),
      new Contact("Goro Majima", "080.8765.4321", "majima@everywhere.net", "Nutjob")
    ];
  }
  //add a new contact containing the given info
  add(info) {
    this.contacts.push(new Contact(info[0], info[1], info[2], info[3]));
  }
  //delete the contact at the given index
  deleteAt(index) {
    if (index >= 0 && index < this.contacts.length) {
      this.contacts.splice(index, 1);
    } else {
      console.log("Invalid index.");
    }
  }
  //delete the contact with the given name
  deleteByName(name) {
    for (let index in this.contacts) {
      if (this.contacts[index].name.toLowerCase() === name.trim().toLowerCase()) {
        this.contacts.splice(index, 1);
        break;
      }
    }
  }
  //print all the contacts
  print() {
    if (this.contacts.length < 1) {
      console.log("No contacts.");
      return;
    }
    for (let index in this.contacts) {
      console.log(`${index}. ${this.contacts[index].print()}`);
    }
  }
}

//needed variables
const addressBook = new AddressBook();
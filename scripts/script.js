"use strict";

class Contact {
  constructor(name, email, phone, relation) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
  //returns a properly formatted (console) string for this contact
  print() {
    return `${this.name} | E: ${this.email} | P: ${this.phone} | R: ${this.relation}`;
  }

  //returns a properly formatted HTML block for this contact
  displayHTML() {
    return `<p>Name: ${this.name}</p>
    <p>Email: ${this.email}</p>
    <p>Phone: ${this.phone}</p>
    <p>Relation: ${this.relation}</p>`;
  }
}

class AddressBook {
  constructor() {
    this.contacts = [
      new Contact("Kazuma Kiryu", "kiryu@dragonofdojima.net", "080.1234.5678", "My Dude"),
      new Contact("Goro Majima", "majima@everywhere.net", "080.8765.4321", "Nutjob")
    ];
  }
  //add a new contact containing the given info
  add(info) {
    this.contacts.push(new Contact(...info));
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
  //display all the contacts in the HTML
  display() {
    const contactsContainer = document.querySelector(".contacts-container");
    contactsContainer.innerHTML = ""; //remove the stuff already there
    for (let index in this.contacts) { //create an HTML element for each contact
      let el = document.createElement("div");
      el.classList.add("contact-entry");
      el.innerHTML = `
      ${this.contacts[index].displayHTML()}
      <button type="button" i="${index}" class="remove-btn"><i class="material-icons">delete</i></button>
      `;
      contactsContainer.append(el);
    }
  }
}

//needed variables
const addressBook = new AddressBook();
const form = document.querySelector("form");
const contactsContainer = document.querySelector(".contacts-container");

//add contact to the addressBook and redisplay the container
function addContact(event) {
  event.preventDefault(); //avoid the normal submit functionality
  const formInputs = document.querySelectorAll("form>input");
  const info = [];
  for (let input of formInputs) {
    info.push(input.value); //add the info to the array
    input.value = ""; //clear out the input after getting the info
  }
  addressBook.add(info); //add the contact to the addressBook
  addressBook.display(); //redisplay the contact container
  formInputs[0].focus(); //set focus to the first input again
}

//remove the appropriate contact from the addressBook and then redisplay the container
function removeContact(event) {
  let target = event.target;
  if (target.tagName.toLowerCase() === "i") { //if the icon is clicked
    target = target.parentNode; //set the target as the button anyway
  }
  addressBook.deleteAt(target.attributes["i"].value);
  addressBook.display(); //redisplay the contact container
}

addressBook.display(); //initialize the contacts

form.addEventListener("submit", addContact);
contactsContainer.addEventListener("click", function(event) { //add a listener to the contact container for the remove buttons
  if (event.target.classList.contains("remove-btn") || event.target.parentNode.classList.contains("remove-btn")) { //handles clicking the remove buttons or the icons inside them
    removeContact(event);
  }
});
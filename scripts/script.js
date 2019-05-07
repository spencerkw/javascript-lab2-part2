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
    for (let index in this.contacts) {
      let el = document.createElement("div");
      el.classList.add("contact-entry");
      el.innerHTML = `
      ${this.contacts[index].displayHTML()}
      <button type="button" i="${index}" class="remove-btn">Remove</button>
      `;
      contactsContainer.append(el);
    }
  }
}

//needed variables
const addressBook = new AddressBook();
const main = document.querySelector("main");

function addContact() {
  const formInputs = document.querySelectorAll("form>input");
  const info = [];
  for (let input of formInputs) {
    info.push(input.value); //add the info to the array
    input.value = ""; //clear out the input after getting the info
  }
  addressBook.add(info);
}

addressBook.display(); //initialize the contacts

main.addEventListener("click", function(event) { //add a listener to main that will only work on the buttons
  if (event.target.classList.contains("add-btn")) {
    addContact();
    addressBook.display();
  } else if (event.target.classList.contains("remove-btn")) {
    addressBook.deleteAt(event.target.attributes["i"].value);
    addressBook.display();
  }
});
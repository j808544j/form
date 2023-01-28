const dataList = Object.keys(localStorage).map((key) =>
  JSON.parse(localStorage.getItem(key))
);

$(document).ready(function () {
  dataList.forEach((item, index) => {
    renderForm(item, index);
  });
});

$("button").click(function (e) {
  const firstName = $(".first-name").val();
  const lastName = $(".last-name").val();
  const contactNo = $(".contact-no").val();
  let err = "";

  let contactNoExists, firstNameExists;
  const existingData = dataList.filter((data) => {
    if (data.contact_no === contactNo) {
      contactNoExists = true;
    }
    if (data.first_name === firstName) {
      firstNameExists = true;
    }
    if (firstNameExists || contactNoExists) {
      return true;
    }
    return false;
  });

  if (existingData.length) {
    e.preventDefault();
    if (firstNameExists) {
      err += "Firstname" + " ";
    }
    if (contactNoExists) {
      err += "Contact no" + " ";
    }
    err += "already exists";
    alert(err);
  } else {
    if (
      $.trim(contactNo).length === 10 &&
      $.trim(firstName).length >= 1 &&
      $.trim(lastName).length >= 1
    ) {
      localStorage.setItem(
        firstName,
        JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          contact_no: contactNo,
        })
      );
    } else {
      alert(
        "firstname, lastname should have atleast 1 character and phone number should have exact 10 characters"
      );
    }
  }
});

function handleDelete(key) {
  localStorage.removeItem(key);
  alert(`${key} deleteed`);
  location.reload();
}

function handleInput() {
  $("table").find("tr:gt(0)").remove();
  const searchText = $(".search").val();
  const searchResult = dataList.filter((item, index) => {
    if (
      item.first_name.includes(searchText) ||
      item.last_name.includes(searchText)
    ) {
      return true;
    }
    return false;
  });
  searchResult.forEach((item, index) => renderForm(item, index));
}

function renderForm(item, index) {
  const tr = document.createElement("tr");
  const tdSN = document.createElement("td");
  const tdName = document.createElement("td");
  const tdContact = document.createElement("td");
  const tdDelete = document.createElement("td");
  tdSN.innerText = index;
  tdName.innerText = item.first_name + " " + item.last_name;
  tdContact.innerText = item.contact_no;
  tdDelete.innerText = "X";
  $(tdDelete).click(function () {
    handleDelete(item.first_name);
  });
  tr.append(tdSN);
  tr.append(tdName);
  tr.append(tdContact);
  tr.append(tdDelete);
  $("table").append(tr);
}

function compare(a, b) {
  if (a.first_name < b.first_name) return -1;
  if (a.first_name > b.first_name) return 1;
  return 0;
}

function sort() {
  $("table").find("tr:gt(0)").remove();
  dataList.sort(compare);
  dataList.forEach((item, index) => renderForm(item, index));
}

let allDependents = [];

$("document").ready(function () {
    $("#enrollment-success-modal").modal("hide");
    let responseTag = document.querySelector("#enrollment-response");
    let successMsg = responseTag.dataset.success;
    let failureMsg = responseTag.dataset.failure;
    if (successMsg || failureMsg) {
        if (successMsg) {
            document.querySelector("#enrollment-success-text").textContent = successMsg;
        } else if (failureMsg) {
            document.querySelector("#enrollment-failure-text").textContent = failureMsg;
        }
        $("#enrollment-success-modal").modal("show");
    }

    $("#dependent-modal").on("hidden.bs.modal", function (event) {
        clearDependentFormContents();
    });

    $("#register-form").submit(function (event) {
        $("<input />").attr("type", "hidden")
            .attr("name", "dependents")
            .attr("value", JSON.stringify(allDependents))
            .appendTo("#register-form");
        return true;
    });
});

function renderDependentsTable() {
    let tableBodyElement = document.querySelector("#dependent-table-body");
    tableBodyElement.innerHTML = "";
    for (let dependent of allDependents) {
        let tableRow = document.createElement("tr");
        for (let [key, value] of Object.entries(dependent)) {
            let td = document.createElement("td");
            td.textContent = value;
            tableRow.appendChild(td);
        }
        tableBodyElement.appendChild(tableRow);
    }
    let dependentsTable = document.querySelector("#all-dependents");
    if (dependentsTable.classList.contains("d-none")) {
        dependentsTable.classList.remove("d-none");
    }
}

function onDependentAdd() {
    let dependent = {};
    for (let element of $("#dependent-modal :input")) {
        if (element.name && element.value) {
            if (element.type == "checkbox") {
                if (element.checked) {
                    if (Array.isArray(dependent[element.name])) {
                        dependent[element.name].push(element.value);
                    }
                    else {
                        dependent[element.name] = [element.value];
                    }
                }
            } else {
                dependent[element.name] = element.value;
            }
        }
    }
    if (dependent.dependentpolicy && dependent.dependentcountry && dependent.dependentstate && dependent.dependentcity && dependent.dependentstreet && dependent.dependentdateofbirth && dependent.dependentfirstname && dependent.dependentlastname) {
        allDependents.push(dependent);
        $("#dependent-modal").modal("hide");
        renderDependentsTable();
    } else {
        alert("All fields are required!!");
    }

}

function getTagValue(tagOrSelector) {
    return document.querySelector(tagOrSelector).value;
}

function clearDependentFormContents() {
    $('#dependent-modal').find('input[type="text"]').val('');
    $('#dependent-modal').find('input[type="date"]').val('YYYY-MM-DD');
    $("#policy-div").find("input:checkbox").prop('checked', false); 
}
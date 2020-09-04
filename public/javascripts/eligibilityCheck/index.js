$(document).ready(function () {
    $('#eligibility-check-info').modal('hide');
    document.querySelector("#eligibility-check-progress").classList.add("d-none");
    resetDocumentContents();
    resetInputTags();
    resetSelect();
});

function resetSelect() {
    $('#dependent-id').prop('selectedIndex', 0);
}

function addFieldValidationBorder(tag) {
    document.querySelector(tag).classList.add("border", "border-danger");
}

function removeFieldValidationBorder(tag) {
    document.querySelector(tag).classList.remove("border", "border-danger");
}

function onEligibilityBtnClicked() {
    let subscriberId = document.querySelector("#subscriber-id").value;
    let policyId = document.querySelector("#policy-id").value;
    let dependentId = $("#dependent-id option:selected").val();
    let ids = ["#subscriber-id", "#dependent-id", "#policy-id"];
    let modalContents = document.querySelector("#eligibility-modal-content");
    resetDocumentContents();

    console.log(subscriberId, policyId, dependentId);
    if (!dependentId || dependentId == "Select a value") {
        alert("Select Self or a Dependent Type!");
    } else if (!policyId || !subscriberId) {
        alert("Policy and Subscriber ID are required!");
    } else {
        let data = {
            subscriberId: subscriberId,
            policyId: policyId,
            dependentId: dependentId
        };

        // Submit it to NodeJS (jQuery)
        $.post("/eligibility", data, function (result, status, jqXHR) {// success callback
            document.querySelector("#eligibility-check-progress").classList.remove("d-none");
            let errorCode = result.code;
            let errorMessage = result.message;
            if (errorCode >= 300 || errorCode < 200) {
                // Some error happened
                updateTagContents("#error-msg", modalContents, errorMessage);
            } else {
                if (errorCode == 200) {
                    updateTagContents("#success-eligible-msg", modalContents, errorMessage);
                } else {
                    updateTagContents("#success-ineligible-msg", modalContents, errorMessage);
                }
            }
            for (let id of ids) {
                removeFieldValidationBorder(id);
            }
            $('#eligibility-check-info').modal('show');
            document.querySelector("#eligibility-check-progress").classList.add("d-none");
        });
    }
}

function resetDocumentContents() {
    let modalContents = document.querySelector("#eligibility-modal-content");
    resetTagContents("#error-msg", modalContents);
    resetTagContents("#success-eligible-msg", modalContents);
    resetTagContents("#success-ineligible-msg", modalContents);
}

function resetInputTags() {
    $("#eligibility-check-form input[type='text']").val("");
}

function updateTagContents(tag, parentElement = null, value = "Registration Successful") {
    let element = formatElement(tag, parentElement);
    element.classList.remove("d-none");
    element.textContent = value;
}

function formatElement(tag, parentElement = null) {
    let element = null;
    if (!parentElement) {
        element = parentElement.querySelector(tag);
    } else {
        element = document.querySelector(tag);
    }
    return element;
}

function resetTagContents(tag, parentElement = null) {
    let element = formatElement(tag, parentElement);
    element.classList.add("d-none");
    element.textContent = "";
}
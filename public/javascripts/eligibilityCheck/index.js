$(document).ready(function () {
    $('#eligibility-check-info').modal('hide');
    document.querySelector("#eligibility-check-progress").classList.add("d-none");
    let modalContents = document.querySelector("#eligibility-modal-content");
    let errorArea = modalContents.querySelector("#error-msg");
    errorArea.classList.add("d-none");
    errorArea.textContent = "";
    let successArea = modalContents.querySelector("#success-msg");
    successArea.classList.add("d-none");
    successArea.textContent = "";
});

function addFieldValidationBorder(tag) {
    document.querySelector(tag).classList.add("border", "border-danger");
}

function removeFieldValidationBorder(tag) {
    document.querySelector(tag).classList.remove("border", "border-danger");
}

function onEligibilityBtnClicked() {
    let subscriberId = document.querySelector("#subscriber-id").value;
    let policyId = document.querySelector("#policy-id").value;
    let dependentId = document.querySelector("#dependent-id").value;
    let ids = ["#subscriber-id", "#dependent-id", "#policy-id"];
    let modalContents = document.querySelector("#eligibility-modal-content");
    resetTagContents("#error-msg", modalContents);
    resetTagContents("#success-msg", modalContents);

    console.log(subscriberId, policyId, dependentId);
    if (!subscriberId || !policyId || !dependentId) {
        // border border-danger
        if (!subscriberId) {
            addFieldValidationBorder("#subscriber-id");
        }
        if (!policyId) {
            addFieldValidationBorder("#policy-id");
        }
        if (!dependentId) {
            addFieldValidationBorder("#dependent-id");
        }
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
                updateTagContents("#success-msg", modalContents);
            }
            for (let id of ids) {
                removeFieldValidationBorder(id);
            }
            $('#eligibility-check-info').modal('show');
            document.querySelector("#eligibility-check-progress").classList.add("d-none");
        });
    }
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
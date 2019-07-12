 $(document).ready(() => {
     // Event Listeners
     $('.navbar-item').bind('click', toggleActive);
     $('.incoming-message-button').bind('click', showMessages);
     $('.modal-overlay').bind('click', closeMessages);
     $('.messages-close').bind('click', closeMessages);
     $('.message-delete').bind('click', deleteParent);
     $('.new-task-btn').bind('click', showNewTaskModal);
     $('.task-card-remove').bind('click', showRemoveTaskCard);
     $('#create-new-task-btn').bind('click', createNewTask);
 });

 // Add navbar-active class on clicked navbar item
 function toggleActive(e) {
     let hasClass = $(this).hasClass('navbar-active');
     let target = $(e.target);

     if (!hasClass) {
         $('.navbar-item').each(function (i) {
             $(this).removeClass('navbar-active');
         })
         $(this).addClass('navbar-active');
     } else {
         //if targer is not a button dont close menu
         if (target.hasClass('navbar-active')) {
             $(this).removeClass('navbar-active');
         }

     }
 }
 //show incoming message modal
 function showMessages(e) {
     $('.modal-overlay').css("display", "block");
     $('.incoming-messages').css("display", "flex");
 }
/* 
    * Close incoming message modal.
    * I use this closeMessages button for every modal closing. 
    * This is why i close all modals when we call that)
 */
 function closeMessages(e) {
     if (e.target.id = "new-task-modal") {
         clearNewTaskModalInputs();
     }
     $('.modal-overlay').css("display", "none");
     $('.incoming-messages').css("display", "none");
     $('.new-task-modal-container').css("display", "none");
     removeTaskDialog();
 }
// Delete Parent Element
 function deleteParent(e) {
     $(this).parent().remove();
 }

 function showNewTaskModal(e) {
     $('.modal-overlay').css("display", "block");
     $('.new-task-modal-container').css("display", "flex");
 }
// Delete Parent's Parent
 function deleteParentParent(e) {
     $(this).parent().parent().remove();
 }

 function clearNewTaskModalInputs() {
     $('.new-task-modal-input').each((index, element) => {
         element.value = "";
     })
 }

 // Create New Task and Display on the left navbar task section
 function createNewTask(){
    let newTaskInputs = [];
    $('.new-task-modal-input').each((index, element)=>{
        newTaskInputs.push(element.value);
    })
    let id = Date.now();
    let newTask = 
    `<div class="task-card">
        <div class="task-header">
            ${newTaskInputs[0]}
        </div>
        <div class="task-text">
            ${newTaskInputs[1]}
        </div>
        <div class="task-card-btns">
            <div class="task-card-done task-card-btn fas fa-check-square"></div>
            <div class="task-card-edit task-card-btn fas fa-pen-square"></div>
            <div class="task-card-remove task-card-btn fas fa-flag" id="${id}"></div>
        </div>
    </div>
    `;
    clearNewTaskModalInputs();
     $('.messages-close').click();
    $(".navbar-task-card-container").prepend($(newTask));
    $(`#${id}`).bind('click', showRemoveTaskCard);
 }
 function showRemoveTaskCard(e){
     $('.modal-overlay').css("display", "block");
    let dialog = `
    <div id="remove-task-dialog" class="remove-task-confirm-modal">
        <i class="fas fa-exclamation-triangle">
            <div id="triangle-white-back"></div>
        </i>
        <div class="remove-task-confirm-modal-text">
            Are you sure you want to delete the task?
        </div>
        <div class="task-confirm-modal-btns">
            <div class = "remove-task-confirm-modal-remove-btn remove-task-btn"
            onclick= "$('#${e.target.id}').parent().parent().remove(); removeTaskDialog()">
                Remove
            </div>
            <div class="remove-task-confirm-modal-cancel-btn remove-task-btn" onclick="removeTaskDialog()">
                Cancel
            </div>
        </div>
    </div>`;
    $("body").append($(dialog));
 }

 function removeTaskDialog(target){
     $('.modal-overlay').css("display", "none");
     $('#remove-task-dialog').remove();
 }
﻿$(document).ready(function () {
    $('.card').on('click', '.card__remove-card-btn', deleteCard);
    $('button').on('click', showForm);
    $('.list').on('click', '.list__remove-list-btn', deleteList);
    $('.list__cards-container').sortable({
        connectWith: ".list__cards-container",
        receive:updateCardPosition
    });

    function updateCardPosition(event, ui) {
        var listId = $(this).closest(".list").data("list-id");
        var cardId = ui.item.find(".card__remove-card-btn").data("card-id");

        $.ajax({
            method: "POST",
            url: "/Board/UpdateCardPosition",
            data: { listId: listId, cardId: cardId }
        });
    }

    function deleteList(event) {
        event.stopPropagation();
        var listId = +$(this).closest(".list").data("list-id");
        
        $.ajax({
            method: "DELETE",
            url: "/Board/DeleteList",
            data: { listId: listId },
            success: onSuccess,
            error: onError
            });

        
        function onSuccess(data) {
            if (isNaN(data) || data === 0) {
                return;
            }

            $(event.target).closest(".list").remove();
        }

        function onError(data) {

        }
    }

    function showForm(event) {
        event.stopPropagation();
        $(this).prev().removeClass("hide-form");
    }

    function deleteCard(event) {
        var cardId = +$(event.target).data('cardId');

        $.ajax({
            method: "DELETE",
            url: "/Board/DeleteCard",
            success: onSuccess,
            error: onError,
            data: { cardId: cardId }
            
        });

        function onSuccess(data) {
            if (isNaN(data) || data === 0) {
                return;
            }

            $(event.target).closest(".card").remove();
        }

        function onError(data) {

        }
    }


});

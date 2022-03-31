import {CONSTANTS} from "../actions";
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

const initialState = [
    {
        title: 'ToDo',
        id: uuidv4(),
        cards: [
            {
                id: uuidv4(),
                text: 'Як юзер я маю можливість перетягувати карточки між\n' +
                    'колонками, а також змінювати порядок карточок в колонці.'
            },
            {
                id: uuidv4(),
                text: 'Колір колонки - білий. Колір фону - синій. Колір картки -\n' +
                    'світло-сірий (за замовчуванням).'
            },
            {
                id: uuidv4(),
                text: 'Як юзер я маю можливість відкрити карточку (в окремому вікні) і ' +
                    'додати/відредагувати основну інформацію (назву карточки,опис карточки, ' +
                    'дату до якої карточка повинна бути закрита).'

            }
        ]
    },
    {
        title: 'Done',
        id: uuidv4(),
        cards: [
            {
                id: uuidv4(),
                text: 'Як юзер я маю можливість додавати, видаляти а також змінювати ім’я колонки'
            },
            {
                id: uuidv4(),
                text: 'Як юзер я маю можливість додати в колонку карточку з ім\'ям, а\n' +
                    'також редагувати назву карточки '
            },
            {
                id: uuidv4(),
                text: 'draggable пока тчо в рамках одной колонки'
            }
        ]
    }
]

const listsReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: uuidv4(),
            }

            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: uuidv4(),
            }

            const newState = state.map(
                list => {
                    if (list.id === action.payload.listID) {
                        return {
                            ...list,
                            cards: [...list.cards, newCard]
                        }
                    } else {
                        return list
                    }
                })

            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:

            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload
            const newState = [...state];
            if (type === 'list') {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id)

                const card = listStart.cards.splice(droppableIndexStart, 1);

                const listEnd = state.find(list => droppableIdEnd === list.id);

                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }

            return newState
                default
        :
            return state
    }
};

export default listsReducer;
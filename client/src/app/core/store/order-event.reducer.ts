import { createReducer, on } from '@ngrx/store';
import { OrderEvent } from '../models/order-event.model';

export interface OrderEventState {
  events: OrderEvent[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const initialState: OrderEventState = {
  events: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const orderEventReducer = createReducer(
  initialState,
  on(
    (state: OrderEventState, { event }: { event: OrderEvent }) => ({
      ...state,
      events: [...state.events, event],
      lastUpdated: new Date(event.date),
      error: null
    })
  ),
  on(
    (state: OrderEventState, { event }: { event: OrderEvent }) => {
      const existingIndex = state.events.findIndex(e => e.id === event.id);
      if (existingIndex >= 0) {
        const updatedEvents = [...state.events];
        updatedEvents[existingIndex] = event;
        return { ...state, events: updatedEvents, lastUpdated: new Date(event.date) };
      }
      return { ...state, events: [...state.events, event], lastUpdated: new Date(event.date) };
    }
  ),
  on(
    (state: OrderEventState) => ({
      ...state,
      events: [],
      loading: false,
      error: null,
      lastUpdated: null
    })
  ),
  on(
    (state: OrderEventState, { error }: { error: string }) => ({
      ...state,
      error,
      loading: false
    })
  ),
  on(
    (state: OrderEventState, { loading }: { loading: boolean }) => ({
      ...state,
      loading
    })
  )
);

export const selectAllEvents = (state: OrderEventState): OrderEvent[] => state.events;
export const selectLoading = (state: OrderEventState): boolean => state.loading;
export const selectError = (state: OrderEventState): string | null => state.error;
export const selectLastUpdated = (state: OrderEventState): Date | null => state.lastUpdated;
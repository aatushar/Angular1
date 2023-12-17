import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-bookings',
  templateUrl: './event-bookings.component.html',
  styleUrls: ['./event-bookings.component.css']
})
export class EventBookingsComponent {

  bookings: any[] = [];

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem('eventUser');
    if (localData != null) {
      const user = JSON.parse(localData);
      this.getMyBooking();
    }
  }

  getMyBooking() {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetAllEventBooking').subscribe((res: any) => {
      this.bookings = res.data;
    });
  }

  deleteBookingById(bookingId: number) {
    const url = `https://freeapi.miniprojectideas.com/api/EventBooking/DeleteBookingById/${bookingId}`;

    this.http.delete(url).subscribe(() => {
      console.log(`Booking with ID ${bookingId} deleted successfully.`);
      // You may want to update the 'bookings' array after successful deletion
      this.getMyBooking();
    }, (error) => {
      console.error('Error deleting booking:', error);
    });
  }
}

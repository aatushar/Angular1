// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-my-bookings',
//   templateUrl: './my-bookings.component.html',
//   styleUrls: ['./my-bookings.component.css']
// })
// export class MyBookingsComponent {
//  bookings:any[]=[];
//   constructor(private http: HttpClient){
//     const localData= localStorage.getItem('eventUser');
//     if(localData != null) { 
//      const user = JSON.parse(localData);
//      this.getMyBpooking(user.userId)
//     }
//   }

//   getMyBpooking(userid:number) {
//     this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetBookingsByCustomer?customerId='+userid).subscribe((res:any)=>{
//     this.bookings = res.data;
//     })
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent {
  bookings: any[] = [];

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem('eventUser');
    if (localData != null) {
      const user = JSON.parse(localData);
      this.getMyBooking(user.userId);
    }
  }

  getMyBooking(userId: number) {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetBookingsByCustomer?customerId=' + userId).subscribe((res: any) => {
      this.bookings = res.data;
    });
  }
  deleteBooking(bookingId: number) {
    this.http.delete('https://freeapi.miniprojectideas.com/api/EventBooking/DeleteBookingById?bookingId=' + bookingId).subscribe((res: any) => {
      console.log('Booking deleted successfully:', res);
      // Refresh the bookings array after deletion (assuming you want to remove the deleted booking from the array)
      this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
    });
  }
  
  }

  
  
  


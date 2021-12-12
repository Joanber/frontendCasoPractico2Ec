import { Component, OnInit } from "@angular/core";
import { getAllNotifications } from "./../../utils/api";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  private notifications = [];

  constructor() {}

  ngOnInit() {
    this.setAllNotifications();
  }

  async setAllNotifications() {
    this.notifications = await getAllNotifications();
    this.notifications.forEach(
      (notification) => (notification.showDescription = false)
    );
  }

  toggleDescription(notificationId: string) {
    const currentNotification = this.notifications.filter(
      (notification) => notification.notificationId === notificationId
    )[0];
    currentNotification.showDescription = !currentNotification.showDescription;
  }
}

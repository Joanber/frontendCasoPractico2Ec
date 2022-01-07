import { Component, OnInit } from "@angular/core";
import { getNotificationsOfUser } from "./../../utils/api";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  public routeSub: Subscription;
  public routeParam: string;
  public notifications = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params) => (this.routeParam = params["id"])
    );
    if (this.routeParam) this.setSelectedNotification();
    else this.setAllNotifications();
  }

  async setAllNotifications() {
    this.notifications = await getNotificationsOfUser();
    this.notifications.forEach(
      (notification) => (notification.showDescription = false)
    );
  }

  async setSelectedNotification() {
    await this.setAllNotifications();
    this.notifications = this.notifications.filter(
      (notification) => notification.notificationId === this.routeParam
    );
    this.notifications.forEach((notification) =>
      this.toggleDescription(notification.notificationId)
    );
  }

  toggleDescription(notificationId: string) {
    const currentNotification = this.notifications.filter(
      (notification) => notification.notificationId === notificationId
    )[0];
    currentNotification.showDescription = !currentNotification.showDescription;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

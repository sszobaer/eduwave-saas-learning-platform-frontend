import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export const useAdminNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    console.log("Initializing Pusher...");
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("admin-channel"); // Match backend

    channel.bind("new-teacher", (data: any) => {
      setNotifications(prev => [data, ...prev]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const clearNotifications = () => setNotifications([]);
  return { notifications, clearNotifications };
};

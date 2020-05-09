export default {
    domain_server: "http://127.0.0.1:3001",
    permission: {
        admin: "ADMIN",
        user: "USER",
        deliverer: "DELIVERER",
        none: "NONE",
    },
    export_receipt_status: {
        pending: 1,
        confirmed: 2,
        in_progress: 3,
        waiting_for_delivery: 4,
        delivering: 5,
        finished: 6,
        refused: 7,
    },
};

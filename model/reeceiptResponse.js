var receiptResponse = {
    processed: true,
    _id : 'abc123',
    cancelled: false, // boolean of whether or not this session is cancelled or not.
    from : 'usersid',
    from_username: 'username of from',
    from_photo_gs: 'gs',
    to: 'some other users id',
    to_username: 'to persons username',
    to_photo_gs: 'gs',
    amount: 1800, // Total amount charged to either user_id or other. This value is in cents.
    cut: 300, // Total amount Geeni took as a cut. This is also in cents.
    payout: 1500, // Total amount actually paid to whomever was recieiving, After Stripe takes their cut
    timestamp: "",
    message: " "// required examples: ["For session on (date of session)", "Credit card denied", etc.]
};
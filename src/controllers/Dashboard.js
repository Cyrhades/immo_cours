module.exports = class Dashboard {
    print(request, response) {
        response.render('admin/dashboard/index');
    }
};
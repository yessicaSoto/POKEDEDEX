using System.Web;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/plugins/jquery/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/adminlte")
                       .Include("~/dist/js/adminlte.min.js")
                       .Include("~/dist/js/demo.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval")
                .Include("~/Scripts/jquery.validate.min.js")
                .Include("~/Scripts/jquery.validate.unobtrusive.min.js")
                .Include("~/Scripts/jquery.validate.custom.js")
                .Include("~/Scripts/jquery.validate.form.js"));

            /*vue*/
            bundles.Add(new ScriptBundle("~/bundles/vue")
                .Include("~/Assets/Scripts/vue.js")
                .Include("~/Scripts/vue.min.js"));

            /*axios*/
            bundles.Add(new ScriptBundle("~/bundles/axios")
                .Include("~/Scripts/axios.min.js")
                .Include("~/Scripts/axios.interceptor.js"));
            /*Datattable*/
            bundles.Add(new ScriptBundle("~/bundles/datatable")
                .Include("~/plugins/datatables/jquery.dataTables.min.js")
                .Include("~/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js")
                .Include("~/plugins/datatables-responsive/js/dataTables.responsive.min.js")
                .Include("~/plugins/datatables-responsive/js/responsive.bootstrap4.min.js")
                .Include("~/plugins/datatables/jquery.dataTables.Tool.js"));
            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/boostrap").Include(
                      "~/plugins/bootstrap/js/bootstrap.bundle.min.js"));

            /*utilerias*/
            bundles.Add(new ScriptBundle("~/bundles/utilerias")
                .Include("~/plugins/utilerias/utilerias.js"));

            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/site.css"));

            /*Font Awesome*/
            bundles.Add(new StyleBundle("~/Content/FontAwesome").Include(
                     "~/plugins/fontawesome-free/css/all.min.css", new CssRewriteUrlTransform()));
            /*adminlte*/
            bundles.Add(new StyleBundle("~/Content/adminlte").Include(
                     "~/dist/css/adminlte.min.css", new CssRewriteUrlTransform()));

            /*DataTable*/
            bundles.Add(new StyleBundle("~/Content/datatable")
                .Include("~/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css", new CssRewriteUrlTransform())
                .Include("~/plugins/datatables-responsive/css/responsive.bootstrap4.min.css", new CssRewriteUrlTransform()));

        }
    }
}

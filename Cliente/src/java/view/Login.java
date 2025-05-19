/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package view;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import model.Usuario;
import org.json.JSONObject;

/**
 *
 * @author Felipe
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configuração de codificação
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        String apiUrl;
        HttpClient client;
        Usuario user;
        String jsonString;
        HttpRequest requestPost;
        HttpResponse<String> responseApi;
        Boolean status;
        HttpSession sessao;


        try {

        apiUrl = "http://127.0.0.1:3000/Login/";
        client = HttpClient.newHttpClient();
        sessao = request.getSession();
        user = new Usuario();

        // Recebe dados do form
        user.setLogin(request.getParameter("txtLogin"));
        user.setSenha(request.getParameter("txtSenha"));

        // Converte para JSON
        jsonString = user.toJson().toString();

        // Envia requisição
        requestPost = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonString))
                .build();

        responseApi = client.send(requestPost, HttpResponse.BodyHandlers.ofString());

        status = user.fromJsonLoginString(responseApi.body());

        // Resposta baseada no status
        if (status) {
            sessao.setAttribute("user", user);

            out.println("<!DOCTYPE html>");
            out.println("<html><head><title>Sucesso</title></head><body>");
            out.println("<h1>✅ Login OK!</h1>");
            out.println("<p>Bem-vindo, <strong>" + user.getNome() + "</strong></p>");
            out.println("</body></html>");
        } else {
            out.println("<!DOCTYPE html>");
            out.println("<html><head><title>Erro</title></head><body>");
            out.println("<h1>❌ Login inválido</h1>");
            out.println("</body></html>");
        }

        } catch (Exception ex) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head><title>Erro no Login</title></head>");
            out.println("<body>");
            out.println("<h1>Erro: " + ex.getMessage() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package view;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Usuario;

/**
 *
 * @author Felipe
 */
@WebServlet(name = "Cadastrar", urlPatterns = {"/Cadastrar"})
public class Cadastrar extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Usuario user;
        String jsonString;
        String apiUrl ;
        HttpClient client;
        HttpRequest requestPost;
        try {
            apiUrl  = "http://127.0.0.1:3000/Usuario/";
            client = HttpClient.newHttpClient();

            // Monta a requisição POST (com corpo)
            user = new Usuario();
            user.setCpf(request.getParameter("cpf"));
            user.setSenha(request.getParameter("senha"));
            user.setLogin(request.getParameter("login"));
            user.setNome(request.getParameter("nome"));
            user.setCep(request.getParameter("cep"));
            user.setRua(request.getParameter("rua"));
            user.setBairro(request.getParameter("bairro"));
            user.setCidade(request.getParameter("cidade"));
            user.setNumero(request.getParameter("numero"));
            user.setR1(request.getParameter("pergunta1"));
            user.setR2(request.getParameter("pergunta2"));
            user.setR3(request.getParameter("pergunta3"));
            
            jsonString = user.toJson().toString();
            
            requestPost = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonString))
                .build();
            
            client.send(requestPost, HttpResponse.BodyHandlers.discarding());
                        /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Cadastrar</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Usuario cadastrado com sucess: "+user.getLogin()+ "</h1>");
            out.println("</body>");
            out.println("</html>");
            
        }catch(Exception ex){
        
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Cadastrar</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Cadastrar at " + ex.getMessage() + "</h1>");
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

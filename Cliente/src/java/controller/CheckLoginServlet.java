/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import model.Usuario;

@WebServlet("/check_login")
public class CheckLoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false); // Não cria sessão se não existir

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        if (session != null && session.getAttribute("user") != null) {
            Usuario usuario = (Usuario) session.getAttribute("user");
            out.print("{\"logado\": true, \"usuario\": \"" + usuario.getNome() + "\"}");
        } else {
            out.print("{\"logado\": false}");
        }
        out.flush();
    }
}

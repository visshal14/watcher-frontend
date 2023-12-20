//
//  BackSwipePlugin.swift
//  App
//
//  Created by Vishal Pal on 12/10/23.
//

import Foundation
import Capacitor

@objc(BackswipePlugin)
public class BackswipePlugin: CAPPlugin {
   
    override public func load() {
        bridge?.webView?.allowsBackForwardNavigationGestures = true;
    }
}
